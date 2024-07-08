//require is like import, you are importing the dotenv file
const express = require('express')
const cors = require('cors')
const corsOptions = {
    origin: ['http://localhost:3000', 'http://finance-monitor.vercel.app'], // Allow localhost for development and Vercel domain for production
    optionsSuccessStatus: 200
};
const app = express()
const { db } = require('./db/db')
const {readdirSync} = require('fs')


require('dotenv').config()

const PORT = process.env.PORT


//middlewares
app.use(express.json())
app.use(cors(corsOptions))
 

//routes

readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))


const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('You are listening to port: ', PORT)
    })
    
}   

server()   