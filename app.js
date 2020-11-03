const express= require('express');
const app= express()
const PORT=process.env.PORT || 5000
const mongoose=require('mongoose')

const {MONGOURI}=require('./config/security')



mongoose.connect(MONGOURI) 

mongoose.connect(MONGOURI,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
    
})
mongoose.connection.on('connected',()=>
{
    
    console.log("database connected sucessfully 👍")
})

mongoose.connection.on('error',(err)=>
{
    console.log("database not connected sucessfully")
})

require('./models/user')
require('./models/post')
app.use(express.json())
app.use(require('./routes/authentication'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production")
{
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>
    {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>
{
    console.log("server is running on port",PORT)
})

 