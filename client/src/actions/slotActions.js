import axios from 'axios'
import {GET_SLOTS,BOOK_SLOT,SLOTS_LOADING} from './types'

export const getSlots = () => dispatch => {

  dispatch({type:SLOTS_LOADING})
  axios
    .get('/api/slot/allslots')
    .then(res =>
      dispatch({
        type: GET_SLOTS,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}


export const bookSlot = (id,orderid,select_date) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  const body=JSON.stringify({id,orderid,select_date})
  console.log('function called')
  axios
    .post('/api/booking/slotbooking',body,config)
    .then(res =>
      dispatch({
        type: BOOK_SLOT,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}
