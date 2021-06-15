import React,{useState,useContext} from 'react';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {useHistory,Link} from 'react-router-dom'
import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Signup.css';


export default function Signup() {

const {firebase}=useContext(FirebaseContext)
const history=useHistory()

let imgObj={
  img:<img className='btn-img' src='/Images/spinner.gif' />
}

  const [values, setValues] = useState({
    name:'',
    email:'',
    phone:'',
    password:''
    
  })

  const {name,email,phone,password}=values
  const [loading, setLoading] = useState(false)

  let condition=name===''||email===''||password===''||phone==''

  function handleChange(e) {
    const {name,value}=e.target
    setValues({
      ...values,
      [name]:value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if(condition){
      toast.warning('Please add all fields',{
        position:toast.POSITION.TOP_RIGHT
      })
      setLoading(false)
    }
    try {
      const res=await firebase.auth().createUserWithEmailAndPassword(email,password)
      await res.user.updateProfile({displayName:name})
      await firebase.firestore().collection('users').add({
        id:res.user.uid,
        username:name,
        phone:phone
      })

      toast.success('User registered successfully',{
        position:toast.POSITION.TOP_CENTER
      })
      setLoading(false)
      setTimeout(()=>history.push('/login'),2000)
    } catch (error) {
      if(error && !condition){
        toast.error('User registration failed, Please try again',{
          position:toast.POSITION.TOP_CENTER
        })
        setLoading(false)
      }
    }

  }

  

  return (
    <div>
      <ToastContainer />
      <div className="signupParentDiv">
        <div className='img-div'>
        <img width="100" height="100" src={Logo}></img>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <input
            className="input"
            type="number"
            name="phone"
            value={phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <br />
          <br />
          <button type='submit'>{loading?imgObj.img:'Sign Up'}</button>
        </form>
        <Link style={{textDecoration:'none'}} to='/login'><a>Login</a></Link>
      </div>
    </div>
  );
}
