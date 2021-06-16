import React, { Fragment,useState,useContext,useEffect} from 'react';
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

const [loading, setLoading] = useState(false)
const [imgPath, setImgPath] = useState('')

const {prodName,category,price,file}=values

let condition=prodName===''||category===''||price===''||file===''

let imgObj={
  img:<img className='btn-img' src='/Images/spinner.gif' />
}


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

async function productUploadToFirestore(path) {
  try {
      await firebase.firestore().collection('products').add({
      prodName,
      category,
      price,
      url:path,
      userId:user.uid,
      createdAt:new Date().toDateString()
     })
  } catch (error) {
    toast.error('Product creation failed',{
      position:toast.POSITION.TOP_RIGHT
    })
  }
}

async function fireBaseUpload(){
  try {
    setLoading(true)
    const {ref}=await firebase.storage().ref(`/image/${file.name}`).put(file)
    const path=await ref.getDownloadURL()
    if(path){
      productUploadToFirestore(path)
      toast.success('Product created successfully',{
        position:toast.POSITION.TOP_RIGHT
      })
        setValues({
          prodName:'',
          category:'',
          price:'',
          file:''
        })
        setLoading(false)
        setTimeout(()=>{
          history.push('/')
        },2000)
    }
  } catch (error) {
      toast.error('File upload failed',{
        position:toast.POSITION.TOP_RIGHT
      })

      setLoading(false)
  }
}


async function handleSubmit(e) {
  e.preventDefault()
  if(condition){
    toast.warning('Please add all fields',{
      position:toast.POSITION.TOP_RIGHT
    })
    return
  }
  fireBaseUpload()
  
}

  return (
    <Fragment>
      <Header />
      <ToastContainer />
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <input
              className="input"
              type="text"
              name="prodName"
              value={prodName}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <input
              className="input"
              type="text"
              name="category"
              value={category}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <input className="input" type="number" name="price" 
            value={price} 
            onChange={handleChange}
            />
            <br />
            <img alt="Posts" width="75px" height="75px" src={imgPath}></img>
            <input type="file" name='file' onChange={handleChange} />
            <button className="uploadBtn" type='submit'>{loading?imgObj.img:'Upload and Submit'}</button>
          </form>
        </div>
    
    </Fragment>
  );
};

export default Create;
