import {
CREATE_PROFESSIONAL_SUCCESS,
CREATE_PROFESSIONAL_FAIL,
IS_PROFESSIONAL_TRUE,
IS_PROFESSIONAL_FALSE,
CLEAR_PROFESSIONAL,
GET_PROFESSIONS,
PROF_LOCATION,
MY_ORDERS,
IS_AVAILABLE,
UPDATE_AVAILABLE
} from '../actions/types'

const initialState={
  professionalData:null,
  isProfessional:null,
  isLoading: false,
  professions:null,
  my_orders:null,
  is_available:null
}

export default function(state=initialState,action){
  switch (action.type) {
    case CREATE_PROFESSIONAL_SUCCESS:
      return{
        ...state,
        professionalData:action.payload,
        isProfessional:true,
        isLoading:false,
      }
    case CREATE_PROFESSIONAL_FAIL:
    return{
      ...state,
      professionalData:null,
      isLoading:false,
    }
    case IS_PROFESSIONAL_TRUE:
    return{
      ...state,
      isProfessional:action.payload
    }
    case CLEAR_PROFESSIONAL:
      return initialState
    case GET_PROFESSIONS:
    return {
      ...state,
      professions:action.payload
    }
    case PROF_LOCATION:
      return state
    case MY_ORDERS:
      return {
        ...state,
        my_orders:action.payload,
      }
    case IS_AVAILABLE:
      return {
        ...state,
        is_available:action.payload
      }
    case UPDATE_AVAILABLE:
      return {
        ...state,
        is_available:action.payload,  
      }
      default:
      return state
  }
}
