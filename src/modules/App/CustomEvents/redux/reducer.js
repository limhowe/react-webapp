import { handleActions } from 'redux-actions';
import {
  CUSTOMEVENT_LIST_REQUEST,
  CUSTOMEVENT_LIST_SUCCESS,
  CUSTOMEVENT_LIST_ERROR
} from './actions';

export const initialState = {
  customEvents: [],
  listLoading: false
};

export default handleActions({
  [CUSTOMEVENT_LIST_REQUEST]: (state) => ({
    ...state,
    customEvents: [],
    listLoading: true
  }),
  [CUSTOMEVENT_LIST_SUCCESS]: (state, action) => ({
    ...state,
    customEvents: action.payload,
    listLoading: false
  }),
  [CUSTOMEVENT_LIST_ERROR]: (state) => ({
    ...state,
    listLoading: false
  })
}, initialState);
