const express = require("express")
require('dotenv').config()
const mongoose = require("mongoose")
const tasksRouter = require('./routes/task')
// EXPRESS APP
const app = express();
app.use(express.json())
// routes endpoints
app.use('/api',tasksRouter)
// porT LISTEN after connexion to db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT, ()=> {
        console.log("DB connected and Port listening to",process.env.PORT);
    })
}).catch((error)=>{
    console.log(error,"Not connected to db")
})

