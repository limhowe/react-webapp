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
export const GET_AUDIENCES_ANALYTICS_REQUEST = 'analytics/audiences/request';
export const GET_AUDIENCES_ANALYTICS_MORE_REQUEST = 'analytics/audiences/request-more';
export const GET_AUDIENCES_ANALYTICS_SUCCESS = 'analytics/audiences/success';
export const GET_AUDIENCES_ANALYTICS_MORE_SUCCESS = 'analytics/audiences/success-more';
export const GET_AUDIENCES_ANALYTICS_ERROR = 'analytics/audiences/error';

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

export const getMoreAudiences = createAction(GET_AUDIENCES_ANALYTICS_MORE_REQUEST, (segmentId, offset, limit) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const service = new AnalyticsService(appId, dispatch, getState());
    return service.getAudiences({
      segmentId,
      offset,
      limit
    }, {
      SUCCESS: GET_AUDIENCES_ANALYTICS_MORE_SUCCESS,
      ERROR: GET_AUDIENCES_ANALYTICS_ERROR
    });
  };
});

export const GET_AUDIENCE_COUNT_REQUEST = 'analytics/audiences-count/request';
export const GET_AUDIENCE_COUNT_SUCCESS = 'analytics/audiences-count/success';
export const GET_AUDIENCE_COUNT_ERROR = 'analytics/audiences-count/error';

export const getAudienceCount = createAction(GET_AUDIENCE_COUNT_REQUEST, (segmentIds) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const service = new AnalyticsService(appId, dispatch, getState());
    return service.getAudienceCount({
      segmentIds
    }, {
      SUCCESS: GET_AUDIENCE_COUNT_SUCCESS,
      ERROR: GET_AUDIENCE_COUNT_ERROR
    });
  };
});
