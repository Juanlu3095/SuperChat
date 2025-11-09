import { Request, Response } from "express"
import { hashPassword, validatePassword } from "../utils/encryption.js"
import { validateUserLogin, validateUserRegister } from "../schemas/UserSchema.js"
import { DatabaseValidation } from "../database/utils/databaseValidations.js"
import { UserModelInterface } from "../contracts/interfaces/UserModel.js"
import { SessionModelInterface } from "../contracts/interfaces/SessionModel.js"

export class AuthController {
    private userModel: UserModelInterface
    private sessionModel: SessionModelInterface
    
    public constructor (userModel: UserModelInterface, sessionModel: SessionModelInterface) {
        this.userModel = userModel
        this.sessionModel = sessionModel
    }

    register = async (req: Request, res: Response) => {
        const input = validateUserRegister(req.body)

        if (!input.success) return res.status(422).json({ message: 'Datos no válidos.', error: input.errors })

        const DbValidation = new DatabaseValidation()
        const emailDbValidation = await DbValidation.repeatedValues('users', 'email', input.data.email) // Comprobamos si el email ya existe en la BD
        const nombreDbValidation = await DbValidation.repeatedValues('users', 'nombre', input.data.nombre) // Comprobamos si el nombre de usuario ya existe en la BD

        if (emailDbValidation !== 0 || nombreDbValidation !== 0) return res.status(422).json({ message: 'El usuario ya existe.' })

        const hashedPassword = hashPassword(input.data.password) // Creamos la cadena encriptada para la contraseña
        
        let validateInput = {
            nombre: input.data.nombre,
            email: input.data.email,
            password: hashedPassword
        }
        
        const result = await this.userModel.create(validateInput)

        if (result) {
            return res.status(201).json({ message: 'Usuario creado con éxito.' })
        } else {
            return res.status(500).json({ message: 'Ha ocurrido un error.' })
        }
    }

    login = async (req: Request, res: Response) => {
        // Comprobar que no hay cookie de inicio de sesion para que no genere otra sesión y se guarde en MONGO
        const input = validateUserLogin(req.body)
        if (!input.success) return res.status(422).json({ message: 'Datos no válidos.', data: input.errors })

        const user = await this.userModel.getByEmail(input.data.email) // Recuperamos los datos del usuario de la BD
        if (!user) return res.status(401).json({ message: 'Usuario y contraseña incorrectos.' }) // Se comprueba si el user no es null (NO EXISTE EL USUARIO EN LA BD)

        const validacion = validatePassword(input.data.password, user.password)

        if (validacion) {
            try {
                // Necesitamos modificar cualquier cosa de req.session para que se guarde en MongoDB y se genere la cookie
                req.session.user = user._id.toString() // Le añadimos la id del usuario porque al ser única, es más fácil saber cuándo cambia, además de guardarse en MongoDB
                req.sessionStore.set(req.session.id, req.session, (error) => {
                    if (error) {
                        console.error('Error al crear la sesión.')
                        return res.status(500).json({ message: 'Error al crear la sesión.' })
                    }
                    this.sessionModel.patch(req.session.id, user._id.toString())
                })
                return res.json({ message: 'Usuario y contraseña correctos.' })
            } catch (error) {
                console.error(error)
            }
        } else {
            return res.status(401).json({ message: 'Usuario y/o contraseña no válidos.' })
        }
    }

    getLogin = async (req: Request, res: Response) => {
        const session_id = req.session.id // Obtenemos la id de la sesión
        if (!session_id) return res.status(401).json({ message: 'El usuario no está autenticado.' })

        // Comprobar la id de la sesión en base de datos
        const sessionInfo = await this.sessionModel.getUser(session_id)

        if (sessionInfo) {
            return res.json({ message: 'Usuario correcto.', data: sessionInfo })
        } else {
            return res.status(401).json({ message: 'El usuario no está autenticado.' })
        }
    }

    logout = async (req: Request, res: Response) => {
        if (req.session.id) {
            req.session.destroy((error) => { // Elimina la sesión de express y de la base de datos
                if (error) {
                    res.status(500).json({ message: 'Error al cerrar la sesión.' })
                    console.error('Error al cerrar la sesión: ', error) // Deberían guardarse estos errores en algún sitio
                } else {
                    res.clearCookie('sc-session') // Borra cookie del navegador, seguramente habrá que añadir la configuración de la cookie para que la encuentre
                    .json({ message: 'Cierre de sesión satisfactorio.' })
                }
            })
        }
    }
}