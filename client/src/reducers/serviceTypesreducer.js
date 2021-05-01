import {GET_SERVICE, GET_SERVICETYPES, STORE_ORDER,SERVICETYPES_LOADING} from '../actions/types'

const initialState={
  ser:[],
  order_id:null,
  isLoading:false
}

export default function(state=initialState,action){
  switch (action.type){
    //console.log(GET_SERVICETYPES);
    case GET_SERVICE:
      return {
        ...state,
        ser:action.payload,
        isLoading:false
      }
    case SERVICETYPES_LOADING:
      return {
        ...state,
        isLoading:true
      }
    case STORE_ORDER:
      return {
        ...state,
        order_id:action.payload
      }
    default:
      return state
  }
}
