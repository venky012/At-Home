import {SEND_LOCATION,SELECT_CITY,GET_CITIES,GET_ORDER,ORDER_LOADING} from '../actions/types'

const initialState={
  order:null,
  all_cities:null,
  initial_center:null,
  order_details:null,
  isLoading:false
}

export default function(state=initialState,action){
  switch (action.type){
    case SEND_LOCATION:
      return {
        ...state,
        order:action.payload
      }
    case SELECT_CITY:
    return {
      ...state,
      initial_center:action.payload
    }
    case GET_CITIES:
    return {
      ...state,
      all_cities:action.payload
    }
    case ORDER_LOADING:
    return{
      ...state,
      isLoading:true
    }
    case GET_ORDER:
    return {
      ...state,
      order_details:action.payload,
      isLoading:false
    }
    default:
      return state
  }
}
