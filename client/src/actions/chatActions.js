
import React from 'react'
import {RECEIVE_MESSAGE} from './types'
import {reducer,initialState} from '../reducers/chatReducer'
import io from 'socket.io-client'
export const CTX = React.createContext();


export const sendChatAction=(value)=>dispatch=>{
  // let socket;
  // socket.emit('chat message', value);

    //const [allChats, dispatch]= React.useReducer(reducer,initialState);

    // if(!socket){
    //   socket = io(':3000')
    //   socket.on('chat message', function(msg){
    //     dispatch({type:'RECEIVE_MESSAGE',payload:msg});
    //   })
    // }
    dispatch({type:RECEIVE_MESSAGE,payload:value})
  //  const user="yashwanth"

    // return(
    //   <CTX.Provider>
    //       {props.children}
    //   </CTX.Provider>
    // )
}

// export default function StoreChat(props){
//
// }
