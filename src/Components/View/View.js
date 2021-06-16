import React,{useState,useEffect,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {FirebaseContext} from '../../store/FirebaseContext'
import { AuthContext } from '../../store/AuthContext';
import './View.css';
import {Chat} from '../chat/Chat'


function View({match}) {
  
  const {user}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  const history=useHistory()
  const [post, setPost] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [loading, setLoading] = useState(false)

  let imgObj={
    img:<img className='btn-img' src='/Images/spinner.gif' />
  }

  async function getPostById(id) {
    const post=await firebase.firestore().collection('products').doc(id).get()
    setPost(post.data())
    const res=await firebase.firestore().collection('users').where('id','==',post.data().userId).get()
    res.forEach(doc=>{
      setUserInfo(doc.data())
    })
  }

  async function deleteHandler(id) {
    try {
      setLoading(true)
      await firebase.firestore().collection('products').doc(id).delete()
      toast.success('Product deleted successfully',{
        position:toast.POSITION.TOP_RIGHT
      })
      setLoading(false)
      setTimeout(()=>history.push('/'),2000)
    } catch (error) {
      toast.error('Product deletion failed',{
        position:toast.POSITION.TOP_RIGHT
      })
      setLoading(false)
    }
  }

  useEffect(()=>getPostById(match.params.id),[])

  let chatProps={
    postedBy:userInfo.username,
    id:post && post.userId,
    pid:match.params.id,
  }
  
 
  return (
    <>
    <ToastContainer />
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
        <button className='btn-back' onClick={()=>history.push('/')}>Go To Home</button>
        {
          post?.userId===user?.uid?<button className='btn-delete' 
          onClick={()=>deleteHandler(match.params.id)}>{loading?imgObj.img:'Delete Post'}</button>:''
        }
        
      </div>
    </div>
    <div className='chat-div'>
    <Chat chatProps={chatProps}/>
    </div>
    </>
  );
}
export default View;
