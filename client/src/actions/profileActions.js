import axios from 'axios'
import {GET_PROFILE,GET_PROFILES, PROFILE_LOADING,SET_CURRENT_USER,  CLEAR_CURRENT_PROFILE, GET_ERRORS} from './types'

//get current profile
export const getCurrentProfile = () => dispatch=>{
  dispatch(setProfileLoading())
  axios.get('/api/profile')
    .then(res=> dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err=> dispatch({
      type: GET_PROFILE,
      payload: {}
    }))
}
//get all profiles
export const getProfiles = () => dispatch=>{
  dispatch(setProfileLoading())
  axios.get('/api/profile/all')
    .then(res=> dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(err=> dispatch({
      type: GET_PROFILES,
      payload: null
    }))
}
//get profile by handle
export const getProfileByHandle = (handle) => dispatch=>{
  dispatch(setProfileLoading())
  axios.get(`/api/profile/handle/${handle}`)
    .then(res=> dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err=> dispatch({
      type: GET_PROFILE,
      payload: null
    }))
}
//create profile
export const createProfile =(profileData,history) => dispatch=>{
  axios.post('/api/profile',profileData)
    .then(res=> history.push('/dashboard'))
    .catch(err=> dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
//loading spinner
export const setProfileLoading = ()=>{
  return{
    type: PROFILE_LOADING
  }
}
//delete Account
export const deleteAccount = ()=>dispatch=>{
  if(window.confirm('Are you sure this can NOT be undone!')){
    axios.delete('/api/profile')
      .then(res=>dispatch({type:SET_CURRENT_USER, payload:{}}))
      .catch(err=>dispatch({type: GET_ERRORS, payload:err.response.data}))
  }
}
//Add Experience 
export const addExperience = (expData,history)=> dispatch=>{
  axios.post('api/profile/experience', expData)
    .then(res=> history.push('/dashboard'))
    .catch(err=> dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
//delete Experience 
export const deleteExperience = (id,history)=> dispatch=>{
  axios.delete(`api/profile/experience/${id}`)
    .then(res=> dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err=> dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
//add rducation
export const addEducation = (eduData,history)=> dispatch=>{
  axios.post('api/profile/education', eduData)
    .then(res=> history.push('/dashboard'))
    .catch(err=> dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
//delete education
export const deleteEducation = (id,history)=> dispatch=>{
  axios.delete(`api/profile/education/${id}`)
    .then(res=> dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err=> dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}
// clear current profile
export const clearCurrentProfile = ()=>{
  return{
    type: CLEAR_CURRENT_PROFILE
  }
}