import {GET_SLOTS,BOOK_SLOT,SLOTS_LOADING} from '../actions/types'

const initialState={
  all_slots:[],
  isLoading:false
}

export default function(state=initialState,action){
  switch (action.type){
    case GET_SLOTS:
      return {
        ...state,
        all_slots:action.payload,
        isLoading:false
      }
      case SLOTS_LOADING:
        return {
          ...state,
          isLoading:true
        }

    case BOOK_SLOT:
      return state

    default:
      return state
  }
}
