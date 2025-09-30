import { messageInput } from "shared-types";
import { isString, validateEmail, validatePhoneNumber } from "../utils/validations.js";

export const validateMessage = (message: messageInput) => {

    const result = {
        success: true,
        errors: {
            nombre: '',
            apellidos: '',
            contenido: '',
            email: '',
            telefono: ''
        },
        data: {
            nombre: '',
            apellidos: '',
            contenido: '',
            email: '',
            telefono: ''
        }
    }

    if (!isString(message.nombre)) {
        result.success = false
        result.errors.nombre = 'El campo nombre debe ser un string.'
    }

    if (!isString(message.apellidos)) {
        result.success = false
        result.errors.apellidos = 'El campo apellidos debe ser un string.'
    }
    
    if (!isString(message.contenido)) {
        result.success = false
        result.errors.contenido = 'El campo contenido debe ser un string.'
    }

    if (!validateEmail(message.email)) {
        result.success = false
        result.errors.email = 'El campo email debe tener el formato correcto.'
    }

    if (!validatePhoneNumber(message.telefono)) {
        result.success = false
        result.errors.telefono = 'El campo telefono no tiene el formato correcto.'
    }

    if (result.success) result.data = message // Se podría "sanitizar" los campos

    return result
}