import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from'../../App'
import M from 'materialize-css'
const Login=()=>
{
    const{state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const[password,setpassword]=useState("")
    const[email,setemail]=useState("")
    const postData=()=>
    {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            M.toast({html:"invalid email",classes:"#f44336 red"}) 
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())

        .then(data=>
            {
                console.log(data)
               if(data.error)
               {
                M.toast({html:data.error,classes:"#f44336 red"})
               }
               else{
                   localStorage.setItem("jwt",data.token)
                   localStorage.setItem("user",JSON.stringify(data.user))
                   dispatch({type:"USER",payload:data.user})
                   M.toast({html:"signed suceesfully",classes:"#66bb6a green lighten-1"})
                   history.push('/')
               } 
            }).catch(err=>
                {
                    console.log(err)
                })
    }
    return(
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Blog App</h2>
                <input
                 type="text"
                 placeholder="email"
                 value={email}
                 onChange={(e)=>setemail(e.target.value)}
                 />
                 <input
                 type="password"
                 placeholder="password"
                 value={password}
                 onChange={(e)=>setpassword(e.target.value)}
                 />
                 <button className="btn waves-effect waves-light #f44336 red darken-1"
                 onClick={()=>postData()}>
                   Login
                 </button>
                 <h6>
                 <Link to="/signup">
                   Dont have an account? 
                 </Link></h6>
                 <h6>
                 <Link to="/reset">
                   Forgot password
                 </Link></h6>
           </div>
        </div>
    )
}
export default Login