const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');
const { User } = require('../models/user');

router.post('/signup', async (req, res) => {
    
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phonenumber,
    })
    user = await user.save();
    if (!user) {
        return res.status(404).send('the user cannot be created')
    }
    res.status(200).send(user);
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = "azerty";
    if (!user) {
        return res.status(400).send('the user not found')
    }
    const validPwd = await bcrypt.compareSync(req.body.password, user.password);
    console.log(validPwd)
    if (user && validPwd) {
        const token = jwt.sign({
            userId: user.id,
        },
            secret,
            { expiresIn: '1d' })

        res.status(200).send({ user, token: token })
    } else {
        res.status(400).send('password is wrong');
    }
});
router.post("/forgot-password", async (req,res) => {
    const{email} = req.body;
    
    try {
        const user = await User.findOne({email})
        console.log(user)
        if ( !user){
           return res.status(404).send("user does't exist")
        }
        const secret ="azerty"
        const token = jwt.sign({id:user._id},secret,{
            expiresIn:"15m"
        })
       const link=`http://localhost:8080/reset-password/${user._id}/${token}`
    //    var transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'youremail@gmail.com',
    //       pass: 'yourpassword'
    //     }
    //   });
      
    //   var mailOptions = {
    //     from: 'youremail@gmail.com',
    //     to: 'myfriend@yahoo.com',
    //     subject: 'Sending Email using Node.js',
    //     text: 'That was easy!'
    //   };
      
    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    //   });
       console.log(link)
    } catch (error) {
        console.log("error")
    }


})

router.get("/reset-password/:id/:token",async(req,res)=>{
    const {id,token}= req.params
    const user= await User.findOne({_id:id});
    if(!user){
        
        return res.send("user doesn't exist")

    }
    const secret = "azerty"
    try {
        const verify = jwt.verify(token,secret)
        
        res.send("Verified")
    } catch (error) {
        res.send("Not verified")
        
    }
    


})
router.post("/reset-password/:id/:token",async(req,res)=>{
    const {id,token}= req.params
    const user= await User.findOne({_id:id});
    if(!user){
        
        return res.send("user doesn't exist")

    }
    const secret = "azerty"
    try {
        const verify = jwt.verify(token,secret)
        const encryptedPassword = await bcrypt.hash(req.body.password,10);
        await User.updateOne(
            {
                _id:id
            },{
            $set:{
                password:encryptedPassword,
            }},

        )
        res.send("Password Updated")
    } catch (error) {
        res.send("Not verified")
        
    }
})
module.exports = router