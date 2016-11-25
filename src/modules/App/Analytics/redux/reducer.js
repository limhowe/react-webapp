import { handleActions } from 'redux-actions';
import {
  GET_DEVICE_ANALYTICS_REQUEST,
  GET_DEVICE_ANALYTICS_SUCCESS,
  GET_DEVICE_ANALYTICS_ERROR,
  GET_AUDIENCES_ANALYTICS_REQUEST,
  GET_AUDIENCES_ANALYTICS_SUCCESS,
  GET_AUDIENCES_ANALYTICS_ERROR
} from './actions';

export const initialState = {
  loading: false,
  audiences: [],
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
  [GET_AUDIENCES_ANALYTICS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    audiences: action.payload
  }),
  [GET_AUDIENCES_ANALYTICS_ERROR]: (state) => ({
    ...state,
    loading: false
  })
}, initialState);
