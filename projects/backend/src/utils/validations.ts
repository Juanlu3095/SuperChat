
/**
 * It allows to verify if an email is correct.
 * @param email 
 * @returns {boolean}
 */
export const validateEmail = (email: string) => {
    const regex = /^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/
    return regex.test(email)
} 

/**
 * It allows to verify if a phone number is correct. A correct is number has one optional '+' caracter for prefix and 8 to 15 numbers.
 * @param phone 
 * @returns {boolean}
 */
export const validatePhoneNumber = (phone: string) => {
    const regex = /^\+?[0-9]{8,15}$/
    return regex.test(phone)
}

/**
 * It verifies if a given parameter is a string.
 * @param string 
 * @returns {boolean}
 */
export const isString = (string: any): boolean => {
    return typeof string === 'string' || string instanceof String
}
