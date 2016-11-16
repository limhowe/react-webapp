import { handleActions } from 'redux-actions';
import {
  CAMPAIGNS_LIST_REQUEST,
  CAMPAIGNS_LIST_SUCCESS,
  CAMPAIGNS_LIST_ERROR
} from './actions';

export const initialState = {
  campaigns: [],
  error: ''
};

export default handleActions({
  [CAMPAIGNS_LIST_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGNS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    campaigns: action.payload
  }),
  [CAMPAIGNS_LIST_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  })
}, initialState);
