import {GET_SERVICE, GET_SERVICETYPES,SERVICE_LOADING} from './types';
import axios from 'axios';


const baseUrl = process.env.REACT_APP_BASE_URL;


export const get_service=(service)=>dispatch=>{
console.log('working')
  const config={
    headers:{
      'Content-Type':'application/json'
    }
  }
  dispatch({type:SERVICE_LOADING})
  var url = `${baseUrl}/api/service/`;
  const ser = url.concat(service);
  axios.get(ser,config)
    .then(res => dispatch({
      type: GET_SERVICE,
      payload:res.data
    }))

}
