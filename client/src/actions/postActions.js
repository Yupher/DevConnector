import axios from "axios";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

// add post
export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors())
  axios
    .post("/api/post", postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
// get post
export const getPost = () => (dispatch) => {
  dispatch(setPostLoadin());
  axios
    .get("/api/post")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};
//get post by id
export const getPostById = (id) => (dispatch) => {
  dispatch(setPostLoadin());
  axios
    .get(`/api/post/${id}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null,
      })
    );
};

//post POST_LOADING
export const setPostLoadin = () => {
  return {
    type: POST_LOADING,
  };
};

//delete poste
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`api/post/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//add/remove like
export const likeUnlikePost = (id) => (dispatch) => {
  axios
    .post(`api/post/like/${id}`)
    .then((res) => dispatch(getPost()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//add comment
export const addComment = (commentData, postId) => (dispatch) => {
  dispatch(clearErrors())
  axios
    .post(`/api/post/comment/${postId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
//delete comment
export const deleteComment = ( postId, commentId,) => (dispatch) => {
  axios
    .delete(`/api/post/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// clear errors
export const clearErrors = () =>{
  return {
    type: CLEAR_ERRORS
  }
}
