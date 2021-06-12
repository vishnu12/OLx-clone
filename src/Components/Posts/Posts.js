import React,{useState,useEffect,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import Heart from '../../assets/Heart';
import {FirebaseContext} from '../../store/FirebaseContext'
import './Post.css';

function Posts() {
  const history=useHistory()
  const {firebase}=useContext(FirebaseContext)
  const [posts, setPosts] = useState([])

  async function getProductsPosts() {
    const res = await firebase.firestore().collection('products').get()
    const posts=res.docs.map(itm=>{
      return {
        ...itm.data(),
        id:itm.id
      }
    })
    setPosts(posts)
  }

  useEffect(()=>{
     getProductsPosts()
  },[])

  function handleClick(id) {
   history.push(`/details/${id}`)
  }


  return (
    <div className="postParentDiv">
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
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
