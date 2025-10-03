
/**
 * It allows to escape chars like '<' or '>' for XSS attacks.
 * Obtained from: https://stackoverflow.com/questions/2794137/sanitizing-user-input-before-adding-it-to-the-dom-in-javascript
 * @param {string} input The input to sanitize.
 * @returns {string} The sanitized input
 */
export const escapeChar = (input: string): string => {

    const chars_to_replace = {
        '&': '&amp;',    
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    }

    return input.replace(/./g, (char: string) => chars_to_replace[char] ?? char);
}