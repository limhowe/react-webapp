import { createAction } from 'redux-actions';
import ApplicationService from '../../../../api-services/ApplicationService';

// list
export const APP_LIST_REQUEST = 'application/list/request';
export const APP_LIST_SUCCESS = 'application/list/success';
export const APP_LIST_ERROR = 'application/list/error';

export const appListRequest = createAction(APP_LIST_REQUEST, () => {
  return (dispatch, getState) => {
    const appService = new ApplicationService(dispatch, getState());
    appService.list({
      SUCCESS: APP_LIST_SUCCESS,
      ERROR: APP_LIST_ERROR
    }, {
      successMessage: 'Application list loaded.'
    });
  };
});

export const APP_CHANGE_CURRENT = 'application/change/current';
export const changeCurrentApp = createAction(APP_CHANGE_CURRENT, (app) => app);
