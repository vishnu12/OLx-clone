import React,{useContext,useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/AuthContext';
import { FirebaseContext } from '../../store/FirebaseContext';

function Header() {
  const {user}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()

  const [searchTerm, setSearchTerm] = useState('')

  function handleClick() {
    if(searchTerm){
      history.push(`/search/${searchTerm}`)
      setSearchTerm('')
    }else{
      history.push('/')
    }
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName" onClick={()=>history.push('/')} style={{cursor:'pointer'}}>
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              value={searchTerm}
              onChange={e=>setSearchTerm(e.target.value)}
            />
          </div>
          <div className="searchAction" onClick={()=>handleClick()}>
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {/* <span>{user?`Welcome ${user.displayName}`:'Login'}</span> */}
          {user?<span>{`Welcome ${user.displayName}`}</span>
          :
          <Link to='/login'><span>Login</span></Link>
          }
         
          <hr />
        </div>
        {user && <span onClick={()=>{
          firebase.auth().signOut()
          history.push('/')
        }}>Logout</span>}
        <div className="sellMenu" onClick={()=>history.push('/create')}>
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
