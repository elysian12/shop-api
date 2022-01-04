require('dotenv').config()

const express = require('express')
const app  = express()


//connectDB
const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/auth')

//
app.use(express.json())


//middleware
app.use('/api/v1/auth',authRouter)




//PORT
const port = process.env.PORT || 3000

const start = async()=>{
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`Server is listening on http://localhost:${port}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()