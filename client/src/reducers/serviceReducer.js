import {GET_SERVICE, GET_SERVICETYPES,SERVICE_LOADING} from '../actions/types'

const initialState={
  ser:{},
  isLoading:false
}

export default function(state=initialState,action){
  switch (action.type){
    case GET_SERVICE:
      return {
        ...state,
        ser:action.payload,
        isLoading:false
      }
      case SERVICE_LOADING:
        return {
          ...state,
          isLoading:true
        }
    default:
      return state
  }
}
