import { createAction } from 'redux-actions';
import CustomEventService from '../../../../api-services/CustomEventService';

// list
export const CUSTOMEVENT_LIST_REQUEST = 'customEvent/list/request';
export const CUSTOMEVENT_LIST_SUCCESS = 'customEvent/list/success';
export const CUSTOMEVENT_LIST_ERROR = 'customEvent/list/error';

export const customEventListRequest = createAction(CUSTOMEVENT_LIST_REQUEST, () => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const customEventService = new CustomEventService(appId, dispatch, getState());
    return customEventService.list({
      SUCCESS: CUSTOMEVENT_LIST_SUCCESS,
      ERROR: CUSTOMEVENT_LIST_ERROR
    });
  };
});
