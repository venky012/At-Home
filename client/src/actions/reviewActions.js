import axios from 'axios'
import {returnErrors}from './errorActions'
import {
ADD_REVIEW
} from './types'

const baseUrl = process.env.REACT_APP_BASE_URL;

export const addReview=({review, rating, order_id, professional_id, user_id})=>dispatch=>{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }

    const body=JSON.stringify({review, rating, order_id, professional_id, user_id})
    axios.post(`${baseUrl}/api/reviews/`,body,config)
    .then(res=>dispatch({
      type:ADD_REVIEW,
      payload:res.data
    }))
    .catch(err=>console.log(err.response))
  
  }
  