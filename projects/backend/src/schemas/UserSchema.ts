import { isString, validateEmail } from "../utils/validations.js";
import { escapeChar } from "../utils/utils.js";
import { createUserInput, loginUserInput } from "shared-types";

export const validateUserRegister = (userRegisterInput: createUserInput) => {
    const result = {
        success: true,
        errors: {
            nombre: '',
            email: '',
            password: ''
        },
        data: {
            nombre: '',
            email: '',
            password: ''
        }
    }

    if (!isString(userRegisterInput.nombre)) {
        result.success = false
        result.errors.nombre = 'El campo nombre debe ser un string.'
    }

    if (!validateEmail(userRegisterInput.email)) {
        result.success = false
        result.errors.email = 'El campo email no tiene el formato correcto.'
    }

    if (!isString(userRegisterInput.password)) {
        result.success = false
        result.errors.password = 'El campo contraseña debe ser un string.'
    }

    if (result.success) {
        result.data = {
            nombre: escapeChar(userRegisterInput.nombre.trim()),
            email: userRegisterInput.email.trim().toLowerCase(),
            password: escapeChar(userRegisterInput.password.trim())
        }
    }

    return result
}

export const validateUserLogin = (userLoginInput: loginUserInput) => {
    const result = {
        success: true,
        errors: {
            email: '',
            password: ''
        },
        data: {
            email: '',
            password: ''
        }
    }

    if (!validateEmail(userLoginInput.email)) {
        result.success = false
        result.errors.email = 'El campo email no tiene el formato correcto.'
    }

    if (!isString(userLoginInput.password)) {
        result.success = false
        result.errors.password = 'El campo contraseña debe ser un string.'
    }

    if (result.success) {
        result.data = {
            email: userLoginInput.email.trim().toLowerCase(),
            password: escapeChar(userLoginInput.password.trim())
        }
    }

    return result
}