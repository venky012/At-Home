import axios from 'axios'
import {returnErrors}from './errorActions'
import {
GET_SERVICES,
ADD_SERVICE,
ADD_SLOT,
ADD_CITY,
ADD_SERVICETYPE,
SHOW_SERVICETYPE
} from './types'

export const allServices = () => (dispatch,getState) => {
  dispatch({type:GET_SERVICES})
  axios.get('/api/service/all')
    .then(res => dispatch({
      type: GET_SERVICES,
      payload:res.data
    }))
}


export const addService=({name,about,service_worker})=>dispatch=>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({name,about,service_worker})
  axios.post('/api/service/',body,config)
  .then(res=>dispatch({
    type:ADD_SERVICE,
    payload:res.data
  }))
  .catch(err=>console.log(err.response))

}

export const addServiceType=({name,service_type,cost})=>dispatch=>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({name,service_type,cost})
  axios.post('/api/serviceType/addType',body,config)
  .then(res=>dispatch({
    type:ADD_SERVICETYPE,
    payload:res.data
  }))
  .catch(err=>console.log(err.response))

}


export const addSlot=({start,end})=>dispatch=>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({start,end})
  axios.post('/api/slot/addslot',body,config)
  .then(res=>dispatch({
    type:ADD_SLOT,
    payload:res.data
  }))
  .catch(err=>console.log(err.response))

}


export const addCity=({city,lat,lng})=>dispatch=>{
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({city,lat,lng})
  axios.post('/api/location/addloco',body,config)
  .then(res=>dispatch({
    type:ADD_CITY,
    payload:res.data
  }))
  .catch(err=>console.log(err.response))

}


export const getserviceType=(service)=>dispatch=>{
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
    var url = '/api/serviceType/';
    const ser = url.concat(service);
    axios.get(ser,config)
      .then(res => {
         
        dispatch({
        type: SHOW_SERVICETYPE,
        payload:res.data
      }
  
      )}).catch(err => console.log(err));
  
      
  
  }
  

