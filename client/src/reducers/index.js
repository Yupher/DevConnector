import {combineReducers} from 'redux'
 import authReducers from './authReducers'
 import errorReducer from './errorReducer'
 import profileReducer from './profileReducer'
 import postReducer from './postReducer'

 export default combineReducers({
   auth: authReducers,
   errors: errorReducer,
   profile: profileReducer,
   post: postReducer
 })