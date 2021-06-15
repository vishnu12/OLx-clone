import React,{useState,useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {FirebaseContext} from '../../store/FirebaseContext'
import Logo from '../../olx-logo.png';
import './Login.css';


function Login({location}) {

  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const redirect=location.search?location.search.split('=')[1]:'/'

  let imgObj={
    img:<img className='btn-img' src='/Images/spinner.gif' />
  }

  let condition=email===''||password===''

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
      await firebase.auth().signInWithEmailAndPassword(email,password)
      history.push(redirect)
      setLoading(false)
    } catch (error) {
      if(error && !condition){
        setLoading(false)
        toast.error('Incorrect username or password',{
        position:toast.POSITION.TOP_RIGHT
      })
      }
    }
  }
  return (
    <div>
      <ToastContainer />
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          <br />
          <br />
          <label htmlFor="lname">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type='submit'>{loading?imgObj.img:'Login'}</button>
        </form>
        <Link style={{textDecoration:'none'}} to='/signup'><a>Signup</a></Link>
      </div>
    </div>
  );
}

export default Login;
