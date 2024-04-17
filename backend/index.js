import dotenv from 'dotenv'
import express, { response } from 'express';
import mongoose from 'mongoose'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
const PORT = process.env.PORT || 5000

dotenv.config()

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS policy
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:5000/',
//     methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get('/', (req, res) => {
    return res.status(234).send('Welcome.')
})

app.use('/books', booksRoute)

mongoose
    .connect(process.env.mongoDBURL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is running on port ${PORT}.`)
        })
        }).catch((error) => {
            console.log(error)
        })