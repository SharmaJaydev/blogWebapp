import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import './App.css'
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/home'
import Login from './components/screens/login'
import Signup from './components/screens/signup'
import Profile from './components/screens/profile'
import Createpost from './components/screens/createpost'
import Userprofile from './components/screens/userprofile'
import {reducer,initialState} from'./reducer/userReducer'
import Suscribeuser from './components/screens/suscribeuser'
export const UserContext=createContext()


const Routing=()=>
{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>
  {
    const user=JSON.parse(localStorage.getItem("user"))
    if(user)
    {
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('./login')
    }
  },[])
  return(
<Switch>
    <Route exact path="/">
    <Home />
   </Route>
   <Route path="/signup">
    <Signup />
   </Route>
   <Route path="/login">
    <Login />
   </Route>
   <Route exact path="/profile">
    <Profile />
   </Route>
   <Route path="/createpost">
    <Createpost />
   </Route>
   <Route path="/profile/:userid">
    <Userprofile />
   </Route>
   <Route path="/myfollowerspost">
    <Suscribeuser />
   </Route>
   </Switch>
  )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;


//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