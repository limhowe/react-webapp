import { handleActions } from 'redux-actions';
import {
  APP_LIST_REQUEST,
  APP_LIST_SUCCESS,
  APP_LIST_ERROR,
  APP_CHANGE_CURRENT
} from './actions';

export const initialState = {
  currentApp: null,
  loading: false,
  applications: []
};

export default handleActions({
  [APP_LIST_REQUEST]: (state) => ({
    ...state,
    applications: [],
    loading: true
  }),
  [APP_LIST_SUCCESS]: (state, action) => ({
    ...state,
    applications: action.payload,
    loading: false
  }),
  [APP_LIST_ERROR]: (state) => ({
    ...state,
    loading: false
  }),
  [APP_CHANGE_CURRENT]: (state, action) => ({
    ...state,
    currentApp: Object.assign({}, action.payload)
  })
}, initialState);
