import {GET_SERVICETYPES, GET_SERVICE, STORE_ORDER,SERVICETYPES_LOADING} from './types';
import axios from 'axios';


const baseUrl = process.env.REACT_APP_BASE_URL;


export const get_services=(service)=>dispatch=>{
// console.log('working')
// console.log(GET_SERVICETYPES)
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }

  var url = `${baseUrl}/api/serviceType/`;
  dispatch({type:SERVICETYPES_LOADING})
  const ser = url.concat(service);
  axios.get(ser,config)
    .then(res => {
      dispatch({
      type: GET_SERVICE,
      payload:res.data
    }

    )}).catch(err => console.log(err));

    // console.log(res);

}

export const store_order = (selected_services) => dispatch => {
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }

  const body=JSON.stringify(selected_services)
  console.log(`qwerty store ${body}`)
  axios
    .post(`${baseUrl}/api/order/makeorder`,body,config)
    .then(res =>
      dispatch({
        type: STORE_ORDER,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}
