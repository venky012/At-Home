import {
USER_LOADING,
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_SUCCESS,
REGISTER_SUCCESS,
REGISTER_FAIL,
MY_BOOKINGS,
EDIT_PROFILE,
ORDER_PAYMENT
} from '../actions/types'

const initialState={
  token:localStorage.getItem('token'),
  isAuthenticated:null,
  isLoading: false,
  user:null,
  mybookings:null
}

export default function(state=initialState,action){
  switch(action.type){
    case USER_LOADING:
      return{
        ...state,
        isLoading:true
      }
    case USER_LOADED:
      return{
        ...state,
        isAuthenticated:true,
        isLoading:false,
        user:action.payload
      }
      case EDIT_PROFILE:
        return state
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    localStorage.setItem('token',action.payload.token)
      return{
        ...state,
        ...action.payload,
        isAuthenticated:true,
        isLoading:false,
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token')
      return{
        ...state,
        token:null,
        user:null,
        isAuthenticated: false,
        isLoading:false
      }
    case MY_BOOKINGS:
    return {
      ...state,
      mybookings:action.payload,
    }
    case ORDER_PAYMENT:
      return state
    default:
    return state
  }

}
