import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode'
import {GET_ERRORS,SET_CURRENT_USER} from '../actions/types'

//register user
export const registerUser = (userData,history) => dispatch =>{
  axios
    .post("/api/users/register", userData)
    .then(res => history.push('/validateemail'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      );
}

// login user get user token 
export const loginUser = userData => dispatch =>{
  axios.post('/api/users/login',userData)
    .then(res=>{
      //save to local stoage
      const {token} = res.data
      localStorage.setItem('jwtToken', token)
      //set token to auth header
      setAuthToken(token)
      // decode jwt to get user data  
      const decoded = jwt_decode(token)
      //set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
}

//set logged in user
export const setCurrentUser = (decoded)=>{
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// logout user
 export const logoutUser = ()=> dispatch =>{
   localStorage.removeItem('jwtToken')
   setAuthToken(false)
   dispatch(setCurrentUser({}))
 }