import axios from 'axios'
import {returnErrors}from './errorActions'
import {
CREATE_PROFESSIONAL_SUCCESS,
CREATE_PROFESSIONAL_FAIL,
IS_PROFESSIONAL_TRUE,
IS_PROFESSIONAL_FALSE,
GET_PROFESSIONS,
PROF_LOCATION,
MY_ORDERS,
IS_AVAILABLE,
UPDATE_AVAILABLE
} from './types'
const baseUrl = process.env.REACT_APP_BASE_URL;


export const createProfessional=({user,profession,phonenumber,city})=>(dispatch,getState)=>{
  const token =getState().auth.token

  const config={
    headers:{
      "Content-type":"application/json"
    }
  }

if(token){
  config.headers['x-auth-token']=token
  const body=JSON.stringify({user,profession,phonenumber,city})
  axios.post(`${baseUrl}/api/professional`,body,config)
  .then(res=>dispatch({
    type:CREATE_PROFESSIONAL_SUCCESS,
    payload:res.data
  }))
  .catch(err=>{
    dispatch(returnErrors(err.response.data,err.response.status,'CREATE_PROFESSIONAL_FAIL'))
    dispatch({
    type:CREATE_PROFESSIONAL_FAIL
  })
})

}
}

export const isAvailable = () => (dispatch,getState) => {
  // User Loading
  axios.get(`${baseUrl}/api/professional/isAvailable`,tokenConfig(getState))
    .then(res => dispatch({
      type:IS_AVAILABLE,
      payload:res.data
    }))
  }
  


export const isProf = () => (dispatch,getState) => {
  // User Loading
  axios.get(`${baseUrl}/api/professional/isProfessional`,tokenConfig(getState))
    .then(res => dispatch({
      type:IS_PROFESSIONAL_TRUE,
      payload:res.data
    }))
  }
  export const tokenConfig = getState => {
    const token =getState().auth.token

    const config={
      headers:{
        "Content-type":"application/json"
      }
    }

  if(token){
    config.headers['x-auth-token']=token
  }
  return config
}


export const getProfessions = () => dispatch => {
  
  axios
    .get(`${baseUrl}/api/professional/professions`)
    .then(res =>
      dispatch({
        type: GET_PROFESSIONS,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}


export const sendLocation = (user_id,lat,lng,address,city) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({user_id,lat,lng,address,city})
  axios
    .post(`${baseUrl}/api/professional/saveAddress`,body,config)
    .then(res =>
      dispatch({
        type: PROF_LOCATION,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}


export const myorders = (id) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({id})
  axios
    .post(`${baseUrl}/api/professional/myorders`,body,config)
    .then(res =>
      dispatch({
        type: MY_ORDERS,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}

export const updateAvailable = (id) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({id})
  axios
    .post(`${baseUrl}/api/professional/updateAvailable`,body,config)
    .then(res =>
      dispatch({
        type: UPDATE_AVAILABLE,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}

