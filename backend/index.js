import express, { response } from 'express'
import { PORT, mongoURL } from './config.js'
import mongoose from 'mongoose'
import { Book } from './models/booksModel.js'
import booksRoutes from './routes/booksRoutes.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','PUT','POST','PATCH','DELETE'],
    allowedHeaders:['Content-Type']
}))

app.get('/', (request, response) => {
    console.log("recived here")
    return response.status(234).send("new web update")
})

app.use('/books',booksRoutes)


mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to database");
        app.listen(PORT, () => {
            console.log(`listening to port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Error connecting to database:", error);
    });