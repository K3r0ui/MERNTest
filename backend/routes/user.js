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
    
    const {email} = req.body
    try {
        const user = await User.findOne({email})
        if ( !user){
           return res.status(404).send("user does't exist")
        }
        const secret ="azerty"
        const token = jwt.sign({id:user._id},secret,{
            expiresIn:"15m"
        })
       const link=`http://localhost:3000/reset-password/${user._id}/${token}`
       var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "abb64f31d33a5c",
          pass: "016b22dda472bb"
        }
      });
      
      
      var mailOptions = {
        from: '"Example Team" <from@example.com>',
        to: req.body.email,
        subject: 'Reset Password',
        text: 'Hey There , to reset your password click on the link ',
        html: `<b>Hey there! </b><br><a href="${link}">Click here</a>`
    };
transport.sendMail(mailOptions)
    res.status(200).send(link)
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