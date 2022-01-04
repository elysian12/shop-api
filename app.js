require('dotenv').config()

const express = require('express')
const app  = express()


//connectDB
const connectDB = require('./db/connect')

//routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

//
app.use(express.json())


//middleware
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/user',userRouter)




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