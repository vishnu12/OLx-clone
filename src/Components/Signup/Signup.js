import React,{useState,useContext} from 'react';
import {useHistory,Link} from 'react-router-dom'
import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Signup.css';


export default function Signup() {

const {firebase}=useContext(FirebaseContext)
const history=useHistory()

  const [values, setValues] = useState({
    name:'',
    email:'',
    phone:'',
    password:''
    
  })

  function handleChange(e) {
    const {name,value}=e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res=await firebase.auth().createUserWithEmailAndPassword(email,password)
      await res.user.updateProfile({displayName:name})
      await firebase.firestore().collection('users').add({
        id:res.user.uid,
        username:name,
        phone:phone
      })
    } catch (error) {
      console.log(error);
    }
   history.push('/login')

  }

  const {name,email,phone,password}=values
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link style={{textDecoration:'none'}} to='/login'><a>Login</a></Link>
      </div>
    </div>
  );
}
