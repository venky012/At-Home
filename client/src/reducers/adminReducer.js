import {
GET_SERVICES,
ADD_SERVICE,
ADD_SLOT,
ADD_CITY,
ADD_SERVICETYPE,
SHOW_SERVICETYPE
} from '../actions/types'

const initialState={
  services:null,
  service_types:null
}

export default function(state=initialState,action){
  switch(action.type){
    case GET_SERVICES:
      return{
        ...state,
        services:action.payload
      }
    case ADD_SERVICE:
      return state
    case ADD_SLOT:
      return state
    case ADD_CITY:
      return state
    case ADD_SERVICETYPE:
      return state
    case SHOW_SERVICETYPE:
    return{
      ...state,
      service_types:action.payload
    }
    default:
      return state
  }

}
