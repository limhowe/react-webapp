import { handleActions } from 'redux-actions';
import _ from 'lodash';

import {
  GET_DEVICE_ANALYTICS_REQUEST,
  GET_DEVICE_ANALYTICS_SUCCESS,
  GET_DEVICE_ANALYTICS_ERROR,
  GET_AUDIENCES_ANALYTICS_REQUEST,
  GET_AUDIENCES_ANALYTICS_MORE_REQUEST,
  GET_AUDIENCES_ANALYTICS_SUCCESS,
  GET_AUDIENCES_ANALYTICS_MORE_SUCCESS,
  GET_AUDIENCES_ANALYTICS_ERROR,
  GET_AUDIENCE_COUNT_REQUEST,
  GET_AUDIENCE_COUNT_SUCCESS,
  GET_AUDIENCE_COUNT_ERROR,
  TOGGLE_CUSTOM_EVENT,
  ADD_CUSTOM_EVENT,
  REMOVE_CUSTOM_EVENT,
  GET_EVENT_ANALYTICS_REQUEST,
  GET_EVENT_ANALYTICS_SUCCESS,
  GET_EVENT_ANALYTICS_ERROR,
  CHANGE_EVENT_ANALYTICS_FILTER,
  UPDATE_EVENT_ANALYTICS_FILTER
} from './actions';

export const initialState = {
  loading: false,
  audiences: [],
  audienceCounts: {},
  deviceData: {
    iOS: {
      optIn: 0,
      optOut: 0,
      uninstalled: 0,
      total: 0
    },
    Android: {
      optIn: 0,
      optOut: 0,
      uninstalled: 0,
      total: 0
    }
  },
  selectedEvents: {},
  eventAnalyticsLoading: false,
  eventAnalytics: [],
  eventAnalyticsFilter: {
    segmentId: '',
    startDate: '',
    endDate: '',
    groupBy: 'day'
  }
};

const dataReducer = ({ payload }) => {
  const result = {
    iOS: {
      optIn: 0,
      optOut: 0,
      uninstalled: 0,
      total: 0
    },
    Android: {
      optIn: 0,
      optOut: 0,
      uninstalled: 0,
      total: 0
    }
  };

  payload.forEach((p) => {
    result[p._id] = {
      ...result[p._id],
      total: p.total
    };

    p.devices.forEach((d) => {
      if (d.uninstalled) {
        result[p._id].uninstalled = result[p._id].uninstalled + d.count;
      } else if (d.optIn) {
        result[p._id].optIn = result[p._id].optIn + d.count;
      } else {
        result[p._id].optOut = result[p._id].optOut + d.count;
      }
    });
  });

  return result;
};

const countReducer = (state, { payload }) => ({
  ...state,
  audienceCounts: {
    ...state.audienceCounts,
    ...payload
  }
});

export default handleActions({
  [GET_DEVICE_ANALYTICS_REQUEST]: (state) => ({
    ...state,
    deviceData: {
      iOS: {
        optIn: 0,
        optOut: 0,
        uninstalled: 0,
        total: 0
      },
      Android: {
        optIn: 0,
        optOut: 0,
        uninstalled: 0,
        total: 0
      }
    },
    loading: true
  }),
  [GET_DEVICE_ANALYTICS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    deviceData: dataReducer(action)
  }),
  [GET_DEVICE_ANALYTICS_ERROR]: (state) => ({
    ...state,
    loading: false
  }),
  [GET_AUDIENCES_ANALYTICS_REQUEST]: (state) => ({
    ...state,
    audiences: [],
    loading: true
  }),
  [GET_AUDIENCES_ANALYTICS_MORE_REQUEST]: (state) => ({
    ...state,
    loading: true
  }),
  [GET_AUDIENCES_ANALYTICS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    audiences: action.payload
  }),
  [GET_AUDIENCES_ANALYTICS_MORE_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    audiences: [...state.audiences, ...action.payload]
  }),
  [GET_AUDIENCES_ANALYTICS_ERROR]: (state) => ({
    ...state,
    loading: false
  }),
  [GET_AUDIENCE_COUNT_REQUEST]: (state) => state,
  [GET_AUDIENCE_COUNT_SUCCESS]: (state, action) => countReducer(state, action),
  [GET_AUDIENCE_COUNT_ERROR]: (state) => state,
  [TOGGLE_CUSTOM_EVENT]: (state, action) => ({
    ...state,
    selectedEvents: {
      ...state.selectedEvents,
      [action.payload]: {
        ...state.selectedEvents[action.payload],
        selected: !state.selectedEvents[action.payload].selected
      }
    }
  }),
  [ADD_CUSTOM_EVENT]: (state, { payload }) => ({
    ...state,
    selectedEvents: {
      ...state.selectedEvents,
      [payload._id]: {
        ...payload,
        selected: true
      }
    }
  }),
  [REMOVE_CUSTOM_EVENT]: (state, { payload }) => ({
    ...state,
    selectedEvents: _.omit(state.selectedEvents, payload)
  }),
  [GET_EVENT_ANALYTICS_REQUEST]: (state) => ({
    ...state,
    eventAnalyticsLoading: true
  }),
  [GET_EVENT_ANALYTICS_SUCCESS]: (state, action) => ({
    ...state,
    eventAnalytics: action.payload,
    eventAnalyticsLoading: false
  }),
  [GET_EVENT_ANALYTICS_ERROR]: (state) => ({
    ...state,
    eventAnalyticsLoading: false
  }),
  [CHANGE_EVENT_ANALYTICS_FILTER]: (state) => state,
  [UPDATE_EVENT_ANALYTICS_FILTER]: (state, { payload }) => ({
    ...state,
    eventAnalyticsFilter: {
      ...state.eventAnalyticsFilter,
      [payload.key]: payload.value
    }
  })
}, initialState);
