import { handleActions } from 'redux-actions';
import {
  CAMPAIGN_CREATE_REQUEST,
  CAMPAIGN_CREATE_SUCCESS,
  CAMPAIGN_CREATE_ERROR,
  CAMPAIGN_UPDATE_REQUEST,
  CAMPAIGN_UPDATE_SUCCESS,
  CAMPAIGN_UPDATE_ERROR,
  CAMPAIGN_SCHEDULE_REQUEST,
  CAMPAIGN_SCHEDULE_SUCCESS,
  CAMPAIGN_SCHEDULE_ERROR
} from './actions';

export const initialState = {
  error: '',
  campaign: null
};

export default handleActions({
  [CAMPAIGN_CREATE_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGN_CREATE_SUCCESS]: (state, action) => ({
    ...state,
    campaign: action.payload
  }),
  [CAMPAIGN_CREATE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CAMPAIGN_UPDATE_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGN_UPDATE_SUCCESS]: (state, action) => ({
    ...state,
    campaign: action.payload
  }),
  [CAMPAIGN_UPDATE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CAMPAIGN_SCHEDULE_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGN_SCHEDULE_SUCCESS]: (state, action) => ({
    ...state,
    campaign_schedule: action.payload
  }),
  [CAMPAIGN_SCHEDULE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  })
}, initialState);
