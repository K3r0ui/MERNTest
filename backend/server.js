const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const tasksRouter = require('./routes/task')
const userRouter = require('./routes/user')
var cors = require('cors')
// EXPRESS APP
const app = express();
app.use(cors())
app.use(express.json())
// routes endpoints
app.use('/api',tasksRouter)
app.use('/',userRouter)
// porT LISTEN after connexion to db
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://krw:krw@cluster0.msfcelu.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    app.listen(process.env.PORT, ()=> {
        console.log("DB connected and Port listening to",process.env.PORT);
    })
}).catch((error)=>{
    console.log(error,"Not connected to db")
})

