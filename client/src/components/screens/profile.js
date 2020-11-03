import React,{useEffect,useState,useContext} from 'react'

import {UserContext} from '../../App'
const Profile=()=>
{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const [image,setImage]=useState("")
    
    useEffect(()=>
    {
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>
            {
                setPics(result.mypost)
            })
    },[])
    useEffect(()=>
    {
            if(image)
            {
                const data=new FormData() 
        data.append("file",image)
        data.append("upload_preset","stories_read")
        data.append("cloud_name","aiocuniversity.com")
        fetch("https://api.cloudinary.com/v1_1/aiocuniversity-com/image/upload",
        {
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>
         {
        
             //localStorage.setItem("user",JSON.stringify({...state,pic:data.url}))
             //dispatch({type:"UPDATEPIC",payload:data.url})
             fetch('/updatepic',{
                 method:"put",
                 headers:{
                     "Content-Type":"application/json",
                     "Authorization":"Bearer "+localStorage.getItem("jwt")
                 },
                 body:JSON.stringify({
                     pic:data.url
                 })
             }).then(res=>res.json())
             .then(result=>
                {
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:data.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                })
         })
         .catch(err=>
             {
                 console.log(err)
             })
            }
    },[image])
    const updatePhoto=(file)=>
    {
        setImage(file)

        
    }
    return(
        
        <div style={{maxWidth:"550px",margin:"0px auto"}}>
        <div
        style={{
                    
                    margin:"18px 0px",
                    borderBottom:"1px solid grey",
                }}>
            <div className="pro">

                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                   
                }}>
                    <div>
                      
                        <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                            src={state?state.pic:"loading"}
                            alt="Network Problem"
                        />
                    </div> 
                    <div>
                        <h5>
                         {state?state.name:"loading"}
                         </h5>
                         <div className="follow" style={{dispaly:"flex",justifyContent:"space-around",width:"100%"}}>
                            <h6>{mypics.length}Posts</h6>
                            <h6>{state?state.followers.length:"Loading"}Followers</h6>
                            <h6>{state?state.following.length:"Loading"}Following</h6> 
                         </div>
                        
                    </div>
                </div>
                 <div style={{margin:"10px"}} className="file-field input-field">
                <div className=" btn waves-effect waves-light #f44336 red darken-1">
                <span>Update Pic</span>
                <input type="file" onChange={(e)=>
                {
                    updatePhoto(e.target.files[0])
                }}/>
                </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
                 </div>
            </div>
            <div className="gallery">
            {
                mypics.map(item=>
                {
                    return(
                        <img key={item._id}className="item"src={item.photo} alt={item.title}/>
                    )
                })
            }
            </div>
        </div>
    )
}
export default Profile