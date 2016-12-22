import { createAction } from 'redux-actions';
import UserService from '../../../../api-services/UserService';
import { validate } from '../../../../helpers/validate';
import { hasErrors } from './selector';
const validateRules = {
  firstName: ['required'],
  lastName: ['required'],
  email: ['required', 'email'],
  password: ['required', 'minlen:8'],
  company: ['required'],
  address: ['required'],
  phone: ['required']
};

// list users
export const ADMIN_LIST_REQUEST = 'admin/list/request';
export const ADMIN_LIST_SUCCESS = 'admin/list/success';
export const ADMIN_LIST_ERROR = 'admin/list/error';

export const adminListRequest = createAction(ADMIN_LIST_REQUEST, (query) => {
  return (dispatch, getState) => {
    const adminService = new UserService(dispatch, getState(), false);
    return adminService.list({
      SUCCESS: ADMIN_LIST_SUCCESS,
      ERROR: ADMIN_LIST_ERROR
    }, {
      query
    });
  };
});

export const ADMIN_FETCH_TOKEN_REQUEST = 'admin/fetch-token/request';

export const adminFetchTokenRequest = createAction(ADMIN_FETCH_TOKEN_REQUEST, (adminId) => {
  return (dispatch, getState) => {
    const adminService = new UserService(dispatch, getState(), false);
    return adminService.fetchToken(adminId);
  };
});

export const ADMIN_SET_EDITING_ADMIN = 'admin/set/active-admin';
export const ADMIN_EDIT_FIELD = 'admin/edit/active-admin-field';
export const ADMIN_INIT_NEW = 'admin/init/new';

export const setEditingAdmin = createAction(ADMIN_SET_EDITING_ADMIN, (admin) => admin);
export const editAdminField = createAction(ADMIN_EDIT_FIELD, (field, value, editing) => {
  const rules = validateRules[field];
  let error = validate(value, rules);
  if (editing && field === 'password') {
    error = validate(value, ['minlen:8']);
  }

  return {
    field,
    value,
    error
  };
});
export const initNewAdmin = createAction(ADMIN_INIT_NEW, (admin) => admin);

export const ADMIN_CREATE_REQUEST = 'admin/create/request';
export const ADMIN_CREATE_SUCCESS = 'admin/create/success';
export const ADMIN_CREATE_ERROR = 'admin/create/error';

export const ADMIN_UPDATE_REQUEST = 'admin/update/request';
export const ADMIN_UPDATE_SUCCESS = 'admin/update/success';
export const ADMIN_UPDATE_ERROR = 'admin/update/error';

export const adminCreateRequest = createAction(ADMIN_CREATE_REQUEST, (adminData) => {
  return (dispatch, getState) => {
    Object.keys(adminData).forEach((field) => {
      dispatch(editAdminField(field, adminData[field], false));
    });
    const state = getState();
    if (hasErrors(state)) {
      return dispatch({ type: ADMIN_CREATE_ERROR });
    }

    const adminService = new UserService(dispatch, getState(), false);
    return adminService.create(adminData, {
      SUCCESS: ADMIN_CREATE_SUCCESS,
      ERROR: ADMIN_CREATE_ERROR
    }, {
      successMessage: 'Company created.'
    }).then((newAdmin) => {
      dispatch(setEditingAdmin(newAdmin));
    });
  };
});

export const adminUpdateRequest = createAction(ADMIN_UPDATE_REQUEST, (admin, additionalParams) => {
  return (dispatch, getState) => {
    const { _id, ...adminData } = admin;
    const adminService = new UserService(dispatch, getState(), false);
    return adminService.update(_id, { ...adminData }, {
      SUCCESS: ADMIN_UPDATE_SUCCESS,
      ERROR: ADMIN_UPDATE_ERROR
    }, {
      successMessage: 'Saved successfully.',
      ...additionalParams
    });
  };
});

export const ADMIN_READ_REQUEST = 'admin/read/request';
export const ADMIN_READ_SUCCESS = 'admin/read/success';
export const ADMIN_READ_ERROR = 'admin/read/error';

export const adminReadRequest = createAction(ADMIN_READ_REQUEST, (id) => {
  return (dispatch, getState) => {
    const adminService = new UserService(dispatch, getState(), false);
    return adminService.read(id, {
      SUCCESS: ADMIN_READ_SUCCESS,
      ERROR: ADMIN_READ_ERROR
    }).then((admin) => {
      dispatch(setEditingAdmin(admin));
    });
  };
});

export const ADMIN_DELETE_REQUEST = 'admin/delete/request';
export const ADMIN_DELETE_SUCCESS = 'admin/delete/success';
export const ADMIN_DELETE_ERROR = 'admin/delete/error';

export const adminDELETERequest = createAction(ADMIN_DELETE_REQUEST, (id) => {
  return (dispatch, getState) => {
    const adminService = new UserService(dispatch, getState(), false);
    return adminService.read(id, {
      SUCCESS: ADMIN_DELETE_SUCCESS,
      ERROR: ADMIN_DELETE_ERROR
    });
  };
});
