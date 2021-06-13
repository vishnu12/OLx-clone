import React, { Fragment,useState,useContext,useEffect } from 'react';
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import './Create.css';
import Header from '../Header/Header';
import {AuthContext} from '../../store/AuthContext'
import {FirebaseContext} from '../../store/FirebaseContext'

const Create = () => {

const history=useHistory()  
const {user}=useContext(AuthContext)  
const {firebase}=useContext(FirebaseContext)

useEffect(()=>{
 if(!user){
   history.push(`/login?redirect=create`)
 }
},[user])

const [values, setValues] = useState({
  prodName:'',
  category:'',
  price:'',
  file:'',
})

const [imgPath, setImgPath] = useState('')
const {prodName,category,price,file}=values

function imageHandler(event){
  if (event.target.files && event.target.files[0]) {
    setImgPath(URL.createObjectURL(event.target.files[0]))
  }
}

function handleChange(e) {
  imageHandler(e)
  const {name}=e.target
  const value=e.target.name==='file'?e.target.files[0]:e.target.value
  setValues({
    ...values,
    [name]:value
  })
}

async function fireBaseUpload(){
  try {
    const {ref}=await firebase.storage().ref(`/image/${file.name}`).put(file)
    const path=await ref.getDownloadURL()
    if(path){
      productUploadToFirestore(path)
      toast.success('Product succesfully uploaded to firestore')
       setValues({
          prodName:'',
          category:'',
          price:'',
          file:'',
        })
        setImgPath('')
        setInterval(()=>history.push('/'),1500)
    }
  } catch (error) {
    toast.error('File upload failed')
  }
}

async function productUploadToFirestore(path) {
  try {
      firebase.firestore().collection('products').add({
      prodName,
      category,
      price,
      url:path,
      userId:user.uid,
      createdAt:new Date().toDateString()
   
     })
  } catch (error) {
    toast.error('Product upload failed')
  }
}

async function handleSubmit(e) {
  e.preventDefault()
  fireBaseUpload()
  
}

  return (
    <Fragment>
      <Header />
      <ToastContainer />
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              name="prodName"
              value={prodName}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" name="price" 
            value={price} 
            onChange={handleChange}
            />
            <br />
            <br />
            <img alt="Posts" width="75px" height="75px" src={imgPath}></img>
            <br />
            <input type="file" name='file' onChange={handleChange} />
            <br />
            <button className="uploadBtn" type='submit'>upload and Submit</button>
          </form>
        </div>
    
    </Fragment>
  );
};

export default Create;
