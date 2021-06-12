import React,{useState,useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';


function Login() {

  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await firebase.auth().signInWithEmailAndPassword(email,password)
      history.push('/')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
        <Link style={{textDecoration:'none'}} to='/signup'><a>Signup</a></Link>
      </div>
    </div>
  );
}

export default Login;
