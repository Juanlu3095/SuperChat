import { Request, Response } from "express"
import { hashPassword, validatePassword } from "../utils/crypto.js"

export class AuthController {
    private userModel: any
    
    public constructor (userModel: any) {
        this.userModel = userModel
    }

    register = async (req: Request, res: Response) => {
        const { nombre, email, password } = req.body // Validar esto

        const hashedPassword = hashPassword(password) // Creamos la cadena encriptada para la contraseña
        
        let validateInput = {
            nombre,
            email,
            password: hashedPassword
        }
        
        const result = await this.userModel.create(validateInput)

        if (result) {
            return res.json({ message: 'Usuario creado con éxito.' })
        } else {
            return res.status(500).json({ message: 'Ha ocurrido un error.' })
        }
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body // Validar esto

        const user = await this.userModel.getByEmail(email) // Recuperamos los datos del usuario de la BD

        const validacion = validatePassword(password, user.password)

        if (validacion) {
            return res.json({ message: 'Usuario y contraseña correctos.' })
        } else {
            return res.status(401).json({ message: 'Usuario y/o contraseña no válidos.' })
        }
    }
}