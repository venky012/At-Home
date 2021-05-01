import {
    PROF_DISPLAY
    } from '../actions/types'
    
const initialState={
    prof_details:null
}
    
export default function(state=initialState,action){
    switch(action.type){
    case PROF_DISPLAY:
        return{
        ...state,
        prof_details:action.payload
        }

    default:
    return state
    }

}
    