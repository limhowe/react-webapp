import { createAction } from 'redux-actions';
import AnalyticsService from '../../../../api-services/AnalyticsService';

// device analytics
export const GET_DEVICE_ANALYTICS_REQUEST = 'analytics/device/request';
export const GET_DEVICE_ANALYTICS_SUCCESS = 'analytics/device/success';
export const GET_DEVICE_ANALYTICS_ERROR = 'analytics/device/error';

export const getDeviceAnalytics = createAction(GET_DEVICE_ANALYTICS_REQUEST, () => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const service = new AnalyticsService(appId, dispatch, getState());
    return service.getDevicesByPlatform({
      SUCCESS: GET_DEVICE_ANALYTICS_SUCCESS,
      ERROR: GET_DEVICE_ANALYTICS_ERROR
    });
  };
});

// user analytics
export const GET_AUDIENCES_ANALYTICS_REQUEST = 'analytics/device/request';
export const GET_AUDIENCES_ANALYTICS_SUCCESS = 'analytics/device/success';
export const GET_AUDIENCES_ANALYTICS_ERROR = 'analytics/device/error';

export const getAudiences = createAction(GET_AUDIENCES_ANALYTICS_REQUEST, (segmentId, offset, limit) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const service = new AnalyticsService(appId, dispatch, getState());
    return service.getAudiences({
      segmentId,
      offset,
      limit
    }, {
      SUCCESS: GET_AUDIENCES_ANALYTICS_SUCCESS,
      ERROR: GET_AUDIENCES_ANALYTICS_ERROR
    });
  };
});
