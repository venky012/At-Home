import {
GET_NOTIFICATION,
MESSAGE_NOTIFICATION,
NEW_NOTIFICATIONS
} from '../actions/types'

const initialState={
  notifications:[],
  count:null
}

export default function(state=initialState,action){
  switch(action.type){
    case GET_NOTIFICATION:
      return{
        ...state,
        notifications:action.payload
      }
      case MESSAGE_NOTIFICATION:
      return state
      case NEW_NOTIFICATIONS:
      return{
        ...state,
        count:action.payload.length
      }
      return state
    default:
    return state
  }

}
