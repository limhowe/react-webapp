import { handleActions } from 'redux-actions';
import {
  APP_LIST_REQUEST,
  APP_LIST_SUCCESS,
  APP_LIST_ERROR,
  APP_CHANGE_CURRENT,
  APP_SET_ACTIVE_APP,
  APP_EDIT_FIELD,
  APP_CHANGE_STEP,
  APP_CREATE_REQUEST,
  APP_CREATE_SUCCESS,
  APP_CREATE_ERROR,
  APP_UPDATE_REQUEST,
  APP_UPDATE_SUCCESS,
  APP_UPDATE_ERROR,
  APP_SAVE_ACTIVE_APP,
  APP_INIT_NEW,
  APP_READ_REQUEST,
  APP_READ_SUCCESS,
  APP_READ_ERROR
} from './actions';

export const initialState = {
  currentApp: null,
  loading: false,
  saving: false,
  reading: false,
  applications: [],
  activeApp: null,
  dirty: false,
  errors: {},
  step: 0
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
  }),
  [APP_INIT_NEW]: (state) => ({ ...state, step: 0 }),
  [APP_SET_ACTIVE_APP]: (state, action) => ({
    ...state,
    dirty: false,
    activeApp: Object.assign({}, action.payload)
  }),
  [APP_EDIT_FIELD]: (state, action) => ({
    ...state,
    dirty: true,
    activeApp: {
      ...state.activeApp,
      [action.payload.field]: action.payload.value
    }
  }),
  [APP_CHANGE_STEP]: (state, action) => ({ ...state, step: action.payload, dirty: false }),
  [APP_CREATE_REQUEST]: (state) => ({ ...state, saving: true }),
  [APP_CREATE_SUCCESS]: (state) => ({ ...state, saving: false, step: state.step + 1, dirty: false }),
  [APP_CREATE_ERROR]: (state) => ({ ...state, saving: false }),
  [APP_UPDATE_REQUEST]: (state) => ({ ...state, saving: true }),
  [APP_UPDATE_SUCCESS]: (state) => ({ ...state, saving: false, step: state.step + 1, dirty: false }),
  [APP_UPDATE_ERROR]: (state) => ({ ...state, saving: false }),
  [APP_SAVE_ACTIVE_APP]: (state) => state,
  [APP_READ_REQUEST]: (state) => ({ ...state, loading: true }),
  [APP_READ_SUCCESS]: (state) => ({ ...state, loading: false }),
  [APP_READ_ERROR]: (state) => ({ ...state, loading: false })
}, initialState);
