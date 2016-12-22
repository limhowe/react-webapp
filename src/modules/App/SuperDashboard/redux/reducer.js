import { handleActions } from 'redux-actions';
import {
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_SUCCESS,
  ADMIN_LIST_ERROR,
  ADMIN_CREATE_REQUEST,
  ADMIN_CREATE_SUCCESS,
  ADMIN_CREATE_ERROR,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_ERROR,
  ADMIN_READ_REQUEST,
  ADMIN_READ_SUCCESS,
  ADMIN_READ_ERROR,
  ADMIN_SET_EDITING_ADMIN,
  ADMIN_EDIT_FIELD,
  ADMIN_INIT_NEW
} from './actions';

export const initialState = {
  listLoading: false,
  editingAdmin: null,
  saving: false,
  reading: false,
  formErrors: {},
  users: []
};

export default handleActions({
  [ADMIN_LIST_REQUEST]: (state) => ({
    ...state,
    users: [],
    listLoading: true
  }),
  [ADMIN_LIST_SUCCESS]: (state, action) => ({
    ...state,
    users: action.payload,
    listLoading: false
  }),
  [ADMIN_LIST_ERROR]: (state) => ({
    ...state,
    listLoading: false
  }),
  [ADMIN_CREATE_REQUEST]: (state) => ({ ...state, saving: true }),
  [ADMIN_CREATE_SUCCESS]: (state) => ({ ...state, saving: false }),
  [ADMIN_CREATE_ERROR]: (state) => ({ ...state, saving: false }),
  [ADMIN_UPDATE_REQUEST]: (state) => ({ ...state, saving: true }),
  [ADMIN_UPDATE_SUCCESS]: (state) => ({ ...state, saving: false }),
  [ADMIN_UPDATE_ERROR]: (state) => ({ ...state, saving: false }),
  [ADMIN_READ_REQUEST]: (state) => ({ ...state, reading: true }),
  [ADMIN_READ_SUCCESS]: (state) => ({ ...state, reading: false }),
  [ADMIN_READ_ERROR]: (state) => ({ ...state, reading: false }),
  [ADMIN_SET_EDITING_ADMIN]: (state, action) => ({
    ...state,
    editingAdmin: action.payload,
    formErrors: {}
  }),
  [ADMIN_EDIT_FIELD]: (state, { payload }) => ({
    ...state,
    editingAdmin: {
      ...state.editingAdmin,
      [payload.field]: payload.value
    },
    formErrors: {
      ...state.formErrors,
      [payload.field]: payload.error
    }
  }),
  [ADMIN_INIT_NEW]: (state) => ({
    ...state,
    editingAdmin: {
      firstName: '',
      lastName: '',
      password: '',
      company: '',
      phone: '',
      address: '',
      email: '',
      disabled: false,
      verified: true
    },
    formErrors: {}
  })
}, initialState);
