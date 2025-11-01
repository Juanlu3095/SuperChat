import cors from 'cors'
import { ACCEPTED_ORIGINS } from '../config/cors.js'

export const applycors = () =>
  cors({
    origin: (origin, callback) => {
      const accepted_origins = ACCEPTED_ORIGINS()

      if (origin && accepted_origins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Solicitud no permitida por CORS.'))
    },
  credentials: true // para que el navegador acepte y guarde cookies enviadas por la api
})