import { handleActions } from 'redux-actions';
import {
  NOTIFICATION_SHOW,
  NOTIFICATION_HIDE,
  NAVDRAWER_SHOW,
  NAVDRAWER_HIDE,
  NAVDRAWER_TOGGLE
} from './actions';

export const initialState = {
  notification: {},
  navDrawerActive: false
};

export default handleActions({
  [NOTIFICATION_SHOW]: (state, action) => ({
    ...state,
    notification: Object.assign({}, action.payload)
  }),
  [NOTIFICATION_HIDE]: (state) => ({
    ...state,
    notification: {}
  }),
  [NAVDRAWER_SHOW]: (state) => ({
    ...state,
    navDrawerActive: true
  }),
  [NAVDRAWER_HIDE]: (state) => ({
    ...state,
    navDrawerActive: false
  }),
  [NAVDRAWER_TOGGLE]: (state) => ({
    ...state,
    navDrawerActive: !state.navDrawerActive
  })
}, initialState);
