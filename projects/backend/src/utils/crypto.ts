import { pbkdf2Sync, randomBytes } from "crypto"

// Se ha utilizado esto:
// https://www.geeksforgeeks.org/node-js/node-js-password-hashing-crypto-module/
// https://stackoverflow.com/questions/71867281/how-to-properly-encrypt-passwords-in-nodejs
// https://stackoverflow.com/questions/17201450/salt-and-hash-password-in-nodejs-w-crypto
// Guardar en base de datos la contraseña como: iterations:salt:hash. Lo explica el último enlace.

/**
 * It hashes the password to make it safe to save in database.
 * @param {string} password 
 * @returns {string}
 */
export const hashPassword = (password: string): string => {
    const salt = randomBytes(16).toString('hex'); // Obtiene un valor aleatorio en 16 bytes y luego transforma en hexadecimal
    const iterations = 100000 // número de iteraciones o número de veces que se hace el hash a la contraseña
    const digest = 'sha512' // Algoritmo que se usa para cada una de las iteraciones

    // 64 es la longitud en bytes de la cadena generada, toString('hex') convierte a cadena de 128 caracteres hexadecimales.
    return `${iterations}:${salt}:${digest}:${pbkdf2Sync(password, salt, iterations, 64, digest).toString('hex')}`
}

/**
 * It validates a password with a hashed password to confirm if they are the same. True if they are the same.+
 * @param {string} password The password the user puts on input.
 * @param {string} hashedPassword The hashed password in DB.
 * @returns {boolean}
 */
export const validatePassword = (password: string, hashedPassword: string): boolean => {
    const dataSplited = hashedPassword.split(":") // Devuelve un array con las cadenas separadas por ':'
    const iterations = Number.parseInt(dataSplited[0])
    const salt = dataSplited[1]
    const digest = dataSplited[2]

    // No se puede deshacer pbkdf2Sync, por lo que se coge los parámetros de conversión de la contraseña de la BD, se crea el hashedPassword y se compara
    const inputPasswordHash = `${iterations}:${salt}:${digest}:${pbkdf2Sync(password, salt, iterations, 64, digest).toString('hex')}`
    return inputPasswordHash == hashedPassword
}