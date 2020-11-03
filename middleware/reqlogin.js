const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const{ JWT }=require('../config/security')
const User=mongoose.model("User")
module.exports=(req,res,next)=>{
    const{authorization}=req.headers
    if(!authorization)
    {
        return res.status(401).json({error:"you must logged in"})
    }
   const token= authorization.replace("Bearer ","")
   jwt.verify(token,JWT,(err,payload)=>
   {
       if(err)
       { 
          return  res.status(401).json({err:"you must be loged in"})
       }
       const{_id}= payload
       User.findById(_id).then(userdata=>
        {
            req.user=userdata
            next()
        })
        
   })

}