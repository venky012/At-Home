import axios from 'axios'
import {
GET_NOTIFICATION,
MESSAGE_NOTIFICATION,
NEW_NOTIFICATIONS
} from './types'

const baseUrl = process.env.REACT_APP_BASE_URL;
export const getNotification = (id) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
const body=JSON.stringify({id})
axios.post(`${baseUrl}/api/booking/notification`,body,config)
.then(res=>{dispatch({
  type:GET_NOTIFICATION,
  payload:res.data
})
})
}

export const messageNotification = (user_id,professional_id,url,order_id) => dispatch =>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({user_id,professional_id,url,order_id})
  axios.post(`${baseUrl}/api/booking/messagenotification`,body,config)
  .then(res=>{dispatch({
    type:MESSAGE_NOTIFICATION,
    payload:res.data
  })
  })

}

export const newNotifications = (user_id) => dispatch =>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({user_id})
  axios.post(`${baseUrl}/api/booking/allNotificationsChecked`,body,config)
  .then(res=>{dispatch({
    type:NEW_NOTIFICATIONS,
    payload:res.data
  })
  })

}

export const clearnewNotifications = (user_id) => dispatch =>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({user_id})
  axios.post(`${baseUrl}/api/booking/clearNotifications`,body,config)
}
