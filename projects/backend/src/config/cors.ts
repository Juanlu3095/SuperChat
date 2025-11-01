
export const ACCEPTED_ORIGINS = () => {
    const ORIGIN_DEVELOP = [
        'http://localhost:4000',
        'http://localhost:4200'
    ]

    const ORIGIN_PROD = [
        'https://juanlu3095.github.io'
    ]

    return process.env.ENVIRONMENT === 'production' ? ORIGIN_PROD : ORIGIN_DEVELOP
}