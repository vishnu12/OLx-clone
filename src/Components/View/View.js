import React,{useState,useEffect,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import {FirebaseContext} from '../../store/FirebaseContext'

import './View.css';
function View({match}) {

  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()
  const [post, setPost] = useState({})
  const [userInfo, setUserInfo] = useState({})

  async function getPostById(id) {
    const post=await firebase.firestore().collection('products').doc(id).get()
    setPost(post.data())
    const res=await firebase.firestore().collection('users').where('id','==',post.data().userId).get()
    res.forEach(doc=>{
      setUserInfo(doc.data())
    })
  }

  useEffect(()=>getPostById(match.params.id),[])

  
  return (
    <div className="viewParentDiv">
      {
        post && <div className="imageShowDiv">
        <img
          src={post.url}
          alt=""
        />
      </div>
      }
      <div className="rightSection">
        {
          post && <div className="productDetails">
                  <p>&#x20B9; {post.price} </p>
                  <span>{post.name}</span>
                  <p>{post.category}</p>
                  <span>{post.createdAt}</span>
                  </div>
        }
        <div className="contactDetails">
          {
            userInfo && (
              <>
            <p>Seller details</p>
            <p>{userInfo.username}</p>
            <p>{userInfo.phone}</p>
            </>
            )
          }
        </div>
        <button onClick={()=>history.push('/')}>Back To Home</button>
      </div>
     
    </div>
  );
}
export default View;
