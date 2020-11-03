import React,{useState,useContext} from 'react'
import {Link,useHistory,useParams} from 'react-router-dom'
// import {UserContext} from'../../App'
import M from 'materialize-css'
const Login=()=>
{
    // const{state,dispatch}=useContext(UserContext)
    const history=useHistory()
    const[password,setpassword]=useState("")
    // const[email,setemail]=useState("")
    const {token}=useParams()
    console.log(token)
    const postData=()=>
    {
        // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        // {
        //     M.toast({html:"invalid email",classes:"#f44336 red"}) 
        //     return
        // }
        fetch("/new-password",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                password,
                token
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
                //    localStorage.setItem("jwt",data.token)
                //    localStorage.setItem("user",JSON.stringify(data.user))
                //    dispatch({type:"USER",payload:data.user})
                   M.toast({html:data.message,classes:"#66bb6a green lighten-1"})
                   history.push('/login')
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
                 type="password"
                 placeholder="enter new password"
                 value={password}
                 onChange={(e)=>setpassword(e.target.value)}
                 />
                 <button className="btn waves-effect waves-light #f44336 red darken-1"
                 onClick={()=>postData()}>
                   Update password
                 </button>
           </div>
        </div>
    )
}
export default Login