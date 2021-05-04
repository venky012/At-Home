import axios from 'axios'
import {GET_ITEMS,ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types'

const baseUrl = process.env.REACT_APP_BASE_URL;
export const getItems = () => dispatch => {
  dispatch(setItemsLoading())
  axios
    .get(`${baseUrl}/api/users/all`)
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload:res.data
      }))
      .catch(err =>console.log(err.response))
}

export const deleteItem = id => {
  return {
    type: DELETE_ITEM,
    payload: id
  }
}

export const addItem = item => {
  return {
    type: ADD_ITEM,
    payload: item
  }
}

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
    loading:true
  }
}
