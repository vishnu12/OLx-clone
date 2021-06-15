import React from 'react'
import './Message.css'

export const Message = ({data}) => {

    const marginRight=data?.type==='seller'?'1rem':'12rem'
    const marginLeft=data?.type==='seller'?'12rem':'1rem'

    const colorPicker=(args)=>{
        return args.type==='seller'?'#1180FF':'#b3abb1'
    }

    const displayName=(arg)=>{
        return arg.type==='seller' && arg.isLoggedInUser?'Me':
               arg.type==='user' && arg.isLoggedInUser?'Me':
               arg.type==='user' && !arg.isLoggedInUser?arg.name:
               arg.type==='seller' && !arg.isLoggedInUser?'seller':''
    }
    
    return (
        <div className='message' 
        style={{backgroundColor:colorPicker(data),
                marginRight:marginRight,
                marginLeft:marginLeft,
                marginTop:'1rem'
            }}
        >   
           <p>{displayName(data)}</p>
            <div className='msg'>
             {data.message}
            </div>
        </div>
    )
}
