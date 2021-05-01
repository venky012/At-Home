import axios from 'axios'
import {
 PROF_DISPLAY
} from './types'

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
  axios.post('http://localhost:3000/api/users/showprofile',body,config)
  .then(res => dispatch({
      type:PROF_DISPLAY,
      payload:res.data
    }))
  .catch(err=>{
        console.log('Error')
      })
}