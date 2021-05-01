import axios from 'axios'
import {SEND_LOCATION,GET_CITIES,SELECT_CITY,GET_ORDER,ORDER_LOADING} from './types'

export const bookSlot = (id,lat,lng,address,city) => dispatch => {
    const config={
      headers:{
        'Content-Type':'application/json'
      }
    }
    const body=JSON.stringify({id,lat,lng,address,city})
    axios
      .post('/api/booking/booking',body,config)
      .then(res =>
        dispatch({
          type: SEND_LOCATION,
          payload:res.data
        }))
        .catch(err =>console.log(err.response))
  }


export const getCities = () => dispatch => {

  axios
    .get('/api/location/cities')
    .then(res =>
      dispatch({
        type: GET_CITIES,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}



export const setLocation =(city,latitude,longitude)=> {
  return{
    type:SELECT_CITY,
    payload:{
      city:city,
      initialCenter:{
      lat:latitude,
      lng:longitude
      }
    }
  }
}

export const getOrder = (id) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  dispatch({type:ORDER_LOADING})
  const body=JSON.stringify({id})
  axios
    .post('/api/booking/getOrder',body,config)
    .then(res =>
      dispatch({
        type: GET_ORDER,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}
