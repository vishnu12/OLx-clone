import React from 'react'
import './Chat.css'

export const Chat = () => {
    return (
        <div className='main'>
         <h3>Chat with the seller</h3>
        <div className='chat-container'>
            <div className="chat-form">
               <form>
               <input type="text" name="text" id="text" />
               <button className='btn' type="submit">SEND</button>
               </form>
            </div>
        </div>
        <div className="messages"></div>
        </div>
    )
}
