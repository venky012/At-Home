import axios from 'axios'
import {returnErrors}from './errorActions'
import {
GET_MESSAGES,
SEND_MESSAGE,
MESSAGES_LOADING
} from './types'

export const sendMessage = (from,to,message) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  let body= JSON.stringify({from,to,message})
  console.log(body)
  axios.post('/api/booking/chat',body,config)
    .then(res => dispatch({
      type: SEND_MESSAGE,
      payload:res.data
    }))
}

export const getMessages = (user_id,professional_id) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  let body= JSON.stringify({user_id,professional_id})
  console.log(body)
  axios.post('/api/booking/getmessages',body,config)
    .then(res => dispatch({
      type: GET_MESSAGES,
      payload:res.data
    }))
}
