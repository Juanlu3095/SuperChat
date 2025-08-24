import express, { json } from 'express'

const app = express()

app.disable('x-powered-by')

app.get('/api', (req, res) => {
    res.send('Hello World')
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})
