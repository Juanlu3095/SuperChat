export interface apiresponse<T> {
    message: string,
    data: T // Genérico, permite añadir los datos cuando se invoca a la interface
}