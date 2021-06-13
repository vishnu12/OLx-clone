import React,{useContext,useEffect} from 'react';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home';
import CreatePage from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import { FirebaseContext } from './store/FirebaseContext';
import { AuthContext } from './store/AuthContext';


function App() {

  const {firebase}=useContext(FirebaseContext)
  const {setUser}=useContext(AuthContext)

  useEffect(()=>{
   firebase.auth().onAuthStateChanged(user=>{
      setUser(user)
    })
    
  },[])

  return (
    <div>
      <Switch>
       <Route exact path='/' component={Home}/>
       <Route path='/search/:term' component={Home}/>
       <Route exact path='/signup' component={Signup}/>
       <Route exact path='/login' component={Login}/>
       <Route exact path='/create' component={CreatePage}/>
       <Route path='/details/:id' component={ViewPost}/>
      </Switch>
    </div>
  );
}

export default App;
