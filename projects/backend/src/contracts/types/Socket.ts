import 'http'

declare module 'http' {
    interface IncomingMessage { // Tipado de Socket.request
        sessionID?: string
    }
}