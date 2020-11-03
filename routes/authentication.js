const express=require('express')

const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {JWT}=require('../config/security')
const reqlogin=require('../middleware/reqlogin')
const nodemailer=require('nodemailer')

const sendgridTransport=require('nodemailer-sendgrid-transport')



const transporter=nodemailer.createTransport(sendgridTransport(
    {
        auth:{
//             api_key:"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"
        }
    }
))
// router.get('/proctected',reqlogin,(req,res)=>
// {
//      res.send("hello user" )
// })
router.post('/signup',(req,res)=>
{
      const{name,email,password,pic}=req.body
      if(!email||!password||!email)
      {
         return res.status(422).json({error:"please enter all the filends in inputs"})
      }
      User.findOne({email:email})
      .then((savedUser)=>
      {
          if(savedUser)
          {
              return res.status(422).json({error:"user alredy exists with that mail"})
          }
          bcrypt.hash(password,8)
          .then(hashedpassword=>
            {
                const user=new User({
                    email,
                    password:hashedpassword,
                    name,
                    pic
                })
                user.save()
                .then(user=>
                  {
                      transporter.sendMail({
                          to:user.email,
                          from:"jaydevjaipur00@gmail.com",
                          subject:"signup sucessfully",
                          html:"<h1>Welcome to Blog app</h1>"
                      })
                      res.json({message:"saved sucessfully"})
                  })
                  .catch(err=>
                      {
                          console.log(err)
                      })
            })  
            })
        .catch(err=>
        {
            console.log(err)
        })
})

router.post('/signin',(req,res)=>
{
    const {email,password}=req.body
    if(!email||!password)
    {
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>
        {
            if(!savedUser)
            {
                res.status(422).json({error:"Invalid email  or password"})
            }
        
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>
            {
                if(doMatch)
                {
                    // res.json({message:"suceesfully signed in"})
                    const token=jwt.sign({_id:savedUser._id},JWT)
                    const {_id,name,email,followers,following,pic}=savedUser
                    res.json({token:token,user:{_id,name,email,followers,following,pic}})
                }
                else{
                    return res.status(422).json({error:"Invalid email or password"})
                }

            })
            .catch(err=>
                {
                    console.log(err)
                })
            })
})
module.exports=router  
