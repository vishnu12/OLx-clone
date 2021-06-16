import React,{useState,useEffect,useContext} from 'react'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import firebase from 'firebase';
import './Chat.css'
import {Message} from './Message'
import {AuthContext} from '../../store/AuthContext'
import {FirebaseContext} from '../../store/FirebaseContext'

export const Chat = ({chatProps}) => {

    const {user}=useContext(AuthContext)
    const {firebase:db}=useContext(FirebaseContext)
    const [text, setText] = useState('')
    const [messages, setMessages] = useState([{
        type:'',
        message:'',
        name:''
    }])
    const [loading, setLoading] = useState(false)

    const conditionalText=user?.uid===chatProps?.id?'user':'seller'
    const conditionalType=user?.uid===chatProps?.id?'seller':'user'

    let imgObj={
        img:<img className='btn-img' src='/Images/spinner.gif' />
      }
    async function sendMessage() {
        if(text===''){
         toast.warning('Please enter the message',{
             position:toast.POSITION.TOP_CENTER
         })
         return
        }
        setLoading(true)
        let message={
            text,
            user:user.displayName,
            userId:user.uid,
            id:chatProps.pid,
            type:conditionalType,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }

        try {
         await db.firestore().collection('messages').add(message)
         setMessages([...messages,{type:conditionalType,message:text,name:user.displayName}])
         setLoading(false)
         setText('')
        } catch (error) {
            toast.error('Something went wrong',{
                position:toast.POSITION.TOP_CENTER
            })
            setLoading(false)
        }
    }

    async function getMessages() {
        const res=await db.firestore().collection('messages')
        .orderBy('timestamp','asc')
        .onSnapshot(snap=>{
            const data=snap.docs.map(itm=>{
                return {
                  ...itm.data()
                }
              })
            
    let sortedMessages=data?.filter(itm=>itm.id===chatProps.pid).map(itm=>{
        return {
            name:itm.user,
            type:itm.type,
            message:itm.text,
            isLoggedInUser:itm.userId===user?.uid
        }
    })
    
    setMessages(sortedMessages)
        })
   
    }

    useEffect(()=>{
     getMessages()
    },[])


    return (
        <div className='main'>
            <ToastContainer />
         {
             !user?<h5>Please login to chat with the seller</h5>:
             <h3>Chat with the {conditionalText}</h3>
         }
        <div className='chat-container'>
            <div className="chat-form">
               <form>
               <input type="text" name="text" value={text} id="text" onChange={e=>setText(e.target.value)}/>
               <button className='btn' type="button" disabled={!user}
               onClick={()=>sendMessage()}>{loading?imgObj.img:'SEND'}</button>
               </form>
            </div>
        </div>
        {
            messages.length!==0?
            <div className="messages">
           {
               messages && messages.map((itm,key)=>{
                   return <Message key={key} data={itm} />
               })
           }
        </div>
        :
        ''

        }
        
        </div>
    )
}
