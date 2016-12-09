import { handleActions } from 'redux-actions';

import {
  DASHBOARD_EVENT_ANALYTICS_REQUEST,
  DASHBOARD_EVENT_ANALYTICS_SUCCESS,
  DASHBOARD_EVENT_ANALYTICS_ERROR,
  DASHBOARD_COUNTRY_DATA_REQUEST,
  DASHBOARD_COUNTRY_DATA_SUCCESS,
  DASHBOARD_COUNTRY_DATA_ERROR,
  DASHBOARD_USER_DATA_REQUEST,
  DASHBOARD_USER_DATA_SUCCESS,
  DASHBOARD_USER_DATA_ERROR
} from './actions';

export const initialState = {
  dpData: {
    totalDP: [],
    dpClick: [],
    appOpenByDate: [],
    totalDPByDate: []
  },
  countryData: [],
  countryDataLoading: false,
  countryDataLoaded: false,
  userData: [],
  userDataLoading: false
};

export default handleActions({
  [DASHBOARD_EVENT_ANALYTICS_REQUEST]: (state) => ({
    ...state
  }),
  [DASHBOARD_EVENT_ANALYTICS_SUCCESS]: (state, { payload }) => ({
    ...state,
    dpData: {
      ...state.dpData,
      [payload.identifier]: payload.result
    }
  }),
  [DASHBOARD_EVENT_ANALYTICS_ERROR]: (state) => ({
    ...state
  }),
  [DASHBOARD_COUNTRY_DATA_REQUEST]: (state) => ({
    ...state,
    countryData: [],
    countryDataLoading: true
  }),
  [DASHBOARD_COUNTRY_DATA_SUCCESS]: (state, { payload }) => ({
    ...state,
    countryDataLoading: false,
    countryDataLoaded: true,
    countryData: payload
  }),
  [DASHBOARD_COUNTRY_DATA_ERROR]: (state) => ({ ...state, countryDataLoading: false, countryDataLoaded: true }),
  [DASHBOARD_USER_DATA_REQUEST]: (state) => ({ ...state, userData: [], userDataLoading: true }),
  [DASHBOARD_USER_DATA_SUCCESS]: (state, { payload }) => ({ ...state, userData: payload, userDataLoading: false }),
  [DASHBOARD_USER_DATA_ERROR]: (state) => ({ ...state, userDataLoading: false })
}, initialState);
