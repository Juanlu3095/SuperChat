import 'express-session';

// Module augmentation: extiende la interface de otro módulo, incluso de paquetes de terceros. Fusiona lo que le añadimos y el original
declare module 'express-session' {
  interface Session {
    user?: string;
  }
}

// https://stackoverflow.com/questions/65254104/express-session-how-to-add-user-detail-info-to-express-session-typesscript
// https://dev.to/akoskm/how-to-use-express-session-with-your-custom-sessiondata-object-and-typescript-1411
/* type CustomSession = Session & {
    user: string
}

type SessionRequest = Omit<Request, 'session'> & {
    session: CustomSession
} */