import React,{useState,useEffect,useContext} from 'react';
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom'
import Heart from '../../assets/Heart';
import {FirebaseContext} from '../../store/FirebaseContext'
import './Post.css';


function Posts({match}) {
  
  const history=useHistory()
  const {firebase}=useContext(FirebaseContext)
  const term=match.params.term?match.params.term:''
  const [posts, setPosts] = useState([])
  const [sortedPosts, setSortedPosts] = useState([])
  
  async function getProductsPosts() {
    let tempArray=[]
    const res = await firebase.firestore().collection('products').get()
    const data=res.docs.map(itm=>{
        return {
          ...itm.data(),
          id:itm.id
        }
      })
      setSortedPosts(data && data.sort(() => Math.random() - Math.random()).slice(0, 3))
      data && data.forEach(itm=>{
        if(itm.prodName.includes(term) || itm.category.includes(term)){
           tempArray.push(itm)
        }
      })
     if(tempArray.length===0 && data.length!==0){
       toast.warning('No such item exists',{
         position:toast.POSITION.TOP_CENTER,
         autoClose:2000
       })
       setPosts(data)
      
     }else{
      setPosts(tempArray)
     }
    
  }

  useEffect(()=>{
   getProductsPosts()
  },[match])

  

  function handleClick(id) {
   history.push(`/details/${id}`)
  }
  
  return (
    <div className="postParentDiv">
      <ToastContainer />
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         {
           posts && posts.map((post,key)=>{
             return (
              <div key={key} className="card" onClick={()=>handleClick(post.id)}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={post.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {post.price}</p>
                <span className="kilometer">{post.category}</span>
                <p className="name"> {post.prodName}</p>
              </div>
              <div className="date">
                <span>{post.createdAt}</span>
              </div>
            </div>
             )
           })
         }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {
          sortedPosts && sortedPosts.map((post,ind)=>{
            return(
              <div className="card" key={ind} onClick={()=>history.push(`/details/${post.id}`)}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={post.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {post.price}</p>
                <span className="kilometer">{post.category}</span>
                <p className="name"> {post.name}</p>
              </div>
              <div className="date">
                <span>{post.createdAt}</span>
              </div>
            </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
}

export default Posts;
