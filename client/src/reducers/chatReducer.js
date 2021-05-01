import
{RECEIVE_MESSAGE} from '../actions/types'

const initialState={
  general:[{from:'adkasdh',msg:'sfasfass'}
  ],
  topic2:[
  ]
}


function reducer(state=initialState, action){
  switch(action.type){
    case 'RECEIVE_MESSAGE':
    const {from , msg , topic} = action.payload;
      return{
          ...state,
          [topic]:[
            ...state[topic],
            {from,msg}
          ]
      }
    default:
      return state
  }
}

export {reducer,initialState}
