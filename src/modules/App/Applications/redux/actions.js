import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import ApplicationService from '../../../../api-services/ApplicationService';

// action for setting current app on navdrawer
export const APP_CHANGE_CURRENT = 'application/change/current';
export const changeCurrentApp = createAction(APP_CHANGE_CURRENT, (app) => app);

// list
export const APP_LIST_REQUEST = 'application/list/request';
export const APP_LIST_SUCCESS = 'application/list/success';
export const APP_LIST_ERROR = 'application/list/error';

export const appListRequest = createAction(APP_LIST_REQUEST, (noDispatch = false) => {
  return (dispatch, getState) => {
    const appService = new ApplicationService(dispatch, getState());
    return appService.list({
      SUCCESS: APP_LIST_SUCCESS,
      ERROR: APP_LIST_ERROR
    }).then((applications) => {
      if (noDispatch) {
        return applications;
      }

      const currentState = getState();
      if (!currentState.application.currentApp) {
        if (applications && applications.length) {
          dispatch(changeCurrentApp(applications[0]));
        } else {
          dispatch(push('/app/applications'));
        }
      }
    });
  };
});

// edit actions
export const APP_SET_ACTIVE_APP = 'application/set/active-app';
export const APP_EDIT_FIELD = 'application/edit/active-app-field';
export const APP_CHANGE_STEP = 'application/change/step';
export const APP_INIT_NEW = 'application/init/new';

export const setActiveApp = createAction(APP_SET_ACTIVE_APP, (app) => app);
export const editAppField = createAction(APP_EDIT_FIELD, (field, value) => ({ field, value }));
export const changeStep = createAction(APP_CHANGE_STEP, (nextStep) => nextStep);
export const initNew = createAction(APP_INIT_NEW, () => {
  return (dispatch) => {
    dispatch(setActiveApp({
      appName: '',
      packageName: ''
    }));
  };
});

// create, edit api
export const APP_CREATE_REQUEST = 'application/create/request';
export const APP_CREATE_SUCCESS = 'application/create/success';
export const APP_CREATE_ERROR = 'application/create/error';

export const APP_UPDATE_REQUEST = 'application/update/request';
export const APP_UPDATE_SUCCESS = 'application/update/success';
export const APP_UPDATE_ERROR = 'application/update/error';

export const appCreateRequest = createAction(APP_CREATE_REQUEST, (appData) => {
  return (dispatch, getState) => {
    const appService = new ApplicationService(dispatch, getState());
    return appService.create(appData, {
      SUCCESS: APP_CREATE_SUCCESS,
      ERROR: APP_CREATE_ERROR
    }, {
      successMessage: 'Application created.'
    }).then((newApp) => {
      dispatch(setActiveApp(newApp));
    });
  };
});

export const appUpdateRequest = createAction(APP_UPDATE_REQUEST, (app) => {
  return (dispatch, getState) => {
    const { _id, ...appData } = app;
    const appService = new ApplicationService(dispatch, getState());
    return appService.update(_id, { ...appData }, {
      SUCCESS: APP_UPDATE_SUCCESS,
      ERROR: APP_UPDATE_ERROR
    }, {
      successMessage: 'Application saved.'
    });
  };
});

export const APP_SAVE_ACTIVE_APP = 'application/save/active-app';
export const saveApp = createAction(APP_SAVE_ACTIVE_APP, () => {
  return (dispatch, getState) => {
    const state = getState().application;
    const { activeApp, step, dirty } = state;
    if (dirty) {
      if (activeApp._id) {
        return dispatch(appUpdateRequest(activeApp));
      } else {
        return dispatch(appCreateRequest(activeApp));
      }
    } else {
      return dispatch(changeStep(step + 1));
    }
  };
});

export const APP_READ_REQUEST = 'application/read/request';
export const APP_READ_SUCCESS = 'application/read/success';
export const APP_READ_ERROR = 'application/read/error';

export const appReadRequest = createAction(APP_READ_REQUEST, (id) => {
  return (dispatch, getState) => {
    const appService = new ApplicationService(dispatch, getState());
    return appService.read(id, {
      SUCCESS: APP_READ_SUCCESS,
      ERROR: APP_READ_ERROR
    }, {
      successMessage: 'Application loaded.'
    }).then((app) => {
      dispatch(changeStep(0));
      dispatch(setActiveApp(app));
    });
  };
});

export const APP_IMAGE_UPLOAD_REQUEST = 'application/image-upload/request';
export const APP_IMAGE_UPLOAD_SUCCESS = 'application/mage-upload/success';
export const APP_IMAGE_UPLOAD_ERROR = 'application/mage-upload/error';

export const appImageUpload = createAction(APP_IMAGE_UPLOAD_REQUEST, (formData) => {
  return (dispatch, getState) => {
    const appService = new ApplicationService(dispatch, getState());
    return appService.uploadImage(formData, {
      SUCCESS: APP_IMAGE_UPLOAD_SUCCESS,
      ERROR: APP_IMAGE_UPLOAD_ERROR
    });
  };
});
