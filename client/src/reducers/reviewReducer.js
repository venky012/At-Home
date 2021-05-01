import {
ADD_REVIEW    
} from '../actions/types'
    
    const initialState={
      isReviewed:null
      }
    
    export default function(state=initialState,action){
      switch(action.type){
        case ADD_REVIEW:
          return{
            ...state,
            isReviewed:action.payload
          }
        default:
          return state
      }
    
    }
    