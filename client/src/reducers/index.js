import {combineReducers} from 'redux'
import itemReducer from './itemReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import profReducer from './profReducer'
import serviceReducer from './serviceReducer'
import {reducer as chatReducer} from './chatReducer'
import slotReducer from './slotReducer'
import serviceTypeReducer from './serviceTypesreducer'
import locationReducer from './locationReducer'
import showProfReducer from './showProfReducer'
import notificationReducer from './notificationReducer'
import mainchatReducer from './mainchatReducer'
import adminReducer from './adminReducer'
import reviewReducer from './reviewReducer'

export default combineReducers({
  item: itemReducer,
  error:errorReducer,
  auth:authReducer,
  prof:profReducer,
  service:serviceReducer,
  chat:chatReducer,
  slots:slotReducer,
  order:serviceTypeReducer,
  booking:locationReducer,
  showProf:showProfReducer,
  notification:notificationReducer,
  message:mainchatReducer,
  admin:adminReducer,
  review:reviewReducer
})
