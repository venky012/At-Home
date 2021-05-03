import axios from 'axios'
import {
 PROF_DISPLAY
} from './types'

const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadProf = (id) => dispatch => {
  // User Loading
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  console.log(PROF_DISPLAY)
  const body = JSON.stringify({id});
  console.log(body)
  axios.post(`${baseUrl}/api/users/showprofile`,body,config)
  .then(res => dispatch({
      type:PROF_DISPLAY,
      payload:res.data
    }))
  .catch(err=>{
        console.log('Error')
      })
}