import { handleActions } from 'redux-actions';
import {
  CAMPAIGNS_LIST_REQUEST,
  CAMPAIGNS_LIST_SUCCESS,
  CAMPAIGNS_LIST_ERROR,
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
  campaigns: [],
  error: ''
};

export default handleActions({
  [CAMPAIGNS_LIST_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGNS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    campaigns: action.payload
  }),
  [CAMPAIGNS_LIST_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
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
