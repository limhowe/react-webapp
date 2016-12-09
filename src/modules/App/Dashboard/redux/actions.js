import { createAction } from 'redux-actions';
import moment from 'moment';
import AnalyticsService from '../../../../api-services/AnalyticsService';

export const DASHBOARD_EVENT_ANALYTICS_INIT = 'dashboard/event/init';
export const DASHBOARD_EVENT_ANALYTICS_REQUEST = 'dashboard/event/request';
export const DASHBOARD_EVENT_ANALYTICS_SUCCESS = 'dashboard/event/success';
export const DASHBOARD_EVENT_ANALYTICS_ERROR = 'dashboard/event/error';

export const getEventAnalytics = createAction(DASHBOARD_EVENT_ANALYTICS_REQUEST, (identifier, params) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    dispatch({
      type: DASHBOARD_EVENT_ANALYTICS_INIT,
      payload: identifier
    });
    const service = new AnalyticsService(appId, dispatch, getState());
    return service.getEventAnalytics({ ...params })
    .then((result) => {
      dispatch({
        type: DASHBOARD_EVENT_ANALYTICS_SUCCESS,
        payload: {
          result,
          identifier
        }
      });
    })
    .catch((err) => {
      console.log(err); // eslint-disable-line
      dispatch({ type: DASHBOARD_EVENT_ANALYTICS_ERROR, payload: { identifier } });
    });
  };
});

export const DASHBOARD_COUNTRY_DATA_REQUEST = 'dashboard/country-data/request';
export const DASHBOARD_COUNTRY_DATA_SUCCESS = 'dashboard/country-data/success';
export const DASHBOARD_COUNTRY_DATA_ERROR = 'dashboard/country-data/error';

export const getCountryDataRequest = createAction(DASHBOARD_COUNTRY_DATA_REQUEST, () => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const service = new AnalyticsService(appId, dispatch, getState());
    return service.getAudienceCountByFilter({ filter: {}, appUserFilter: {}, groupBy: '$country' }, {
      SUCCESS: DASHBOARD_COUNTRY_DATA_SUCCESS,
      ERROR: DASHBOARD_COUNTRY_DATA_ERROR
    });
  };
});

export const DASHBOARD_USER_DATA_REQUEST = 'dashboard/user-data/request';
export const DASHBOARD_USER_DATA_SUCCESS = 'dashboard/user-data/success';
export const DASHBOARD_USER_DATA_ERROR = 'dashboard/user-data/error';

export const getUserDataRequest = createAction(DASHBOARD_USER_DATA_REQUEST, () => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const service = new AnalyticsService(appId, dispatch, getState());
    const eventIds = ['Active Users', 'New Users', 'Dormant Users'];
    const promises = [
      service.getAudienceCountByFilter({ filter: { // active users
        created: { $gte: moment().subtract(__APP_CONFIG__.DASHBOARD_USER_ACTIVE_DAY, 'day').format('YYYY-MM-DD HH:mm:ss') }
      }, appUserFilter: {
        created: { $lt: moment().subtract(__APP_CONFIG__.DASHBOARD_USER_NEW_DAY, 'day').format('YYYY-MM-DD HH:mm:ss') }
      }, groupBy: 'total' }),
      service.getAudienceCountByFilter({ filter: {}, appUserFilter: { created: { $gte: moment().subtract(__APP_CONFIG__.DASHBOARD_USER_NEW_DAY, 'day').format('YYYY-MM-DD HH:mm:ss') } }, groupBy: 'total' }), // new users
      service.getAudienceCountByFilter({ filter: { // dormant users
        created: { $lt: moment().subtract(__APP_CONFIG__.DASHBOARD_USER_ACTIVE_DAY, 'day').format('YYYY-MM-DD HH:mm:ss') }
      }, appUserFilter: {
        created: { $lt: moment().subtract(__APP_CONFIG__.DASHBOARD_USER_NEW_DAY, 'day').format('YYYY-MM-DD HH:mm:ss') }
      }, groupBy: 'total' })
    ];
    Promise.all(promises).then((result) => {
      const data = eventIds.map((id, index) => ({
        value: result[index].length ? result[index][0].count : 0,
        name: id
      }));
      dispatch({
        type: DASHBOARD_USER_DATA_SUCCESS,
        payload: data
      });
    }).catch(() => {
      dispatch({ type: DASHBOARD_EVENT_ANALYTICS_ERROR });
    });
  };
});
