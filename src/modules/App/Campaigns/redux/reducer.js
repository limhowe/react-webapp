import { handleActions } from 'redux-actions';
import {
  CAMPAIGNS_LIST_REQUEST,
  CAMPAIGNS_LIST_SUCCESS,
  CAMPAIGNS_LIST_ERROR,
  CAMPAIGNS_CREATE_REQUEST,
  CAMPAIGNS_CREATE_SUCCESS,
  CAMPAIGNS_CREATE_ERROR
} from './actions';

export const initialState = {
  user: null,
  error: ''
};

export default handleActions({
  [CAMPAIGNS_LIST_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGNS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload
  }),
  [CAMPAIGNS_LIST_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CAMPAIGNS_LIST_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGNS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload
  }),
  [CAMPAIGNS_LIST_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  })
});
