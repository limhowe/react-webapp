import { handleActions } from 'redux-actions';
import {
  AUTH_SIGNIN_REQUEST,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_ERROR,
  AUTH_SIGNOUT_REQUEST,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_ERROR
} from './actions';

export const initialState = {
  user: null,
  error: ''
};

export default handleActions({
  [AUTH_SIGNIN_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [AUTH_SIGNIN_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload
  }),
  [AUTH_SIGNIN_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [AUTH_SIGNOUT_REQUEST]: (state) => state,
  [AUTH_SIGNOUT_SUCCESS]: (state) => ({
    ...state,
    user: null
  }),
  [AUTH_SIGNOUT_ERROR]: (state) => state
}, initialState);
