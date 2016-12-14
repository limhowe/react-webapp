import { handleActions } from 'redux-actions';
import moment from 'moment';
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
  CAMPAIGN_SCHEDULE_ERROR,
  CAMPAIGN_IMAGE_REQUEST,
  CAMPAIGN_IMAGE_SUCCESS,
  CAMPAIGN_IMAGE_ERROR,
  CAMPAIGN_INIT_NEW,
  CAMPAIGN_READ_REQUEST,
  CAMPAIGN_READ_SUCCESS,
  CAMPAIGN_READ_ERROR,
  CAMPAIGN_EDIT_FIELD,
  CAMPAIGN_EDIT_SCHEDULE_FIELD,
  CAMPAIGN_EDIT_DELIVERY_ACTION_FIELD,
  CAMPAIGN_CHANGE_TAB_INDEX,
  CAMPAIGN_ADD_PLATFORM,
  CAMPAIGN_REMOVE_PLATFORM,
  CAMPAIGN_CHANGE_SCHEDULE_TYPE
} from './actions';

import addPlatform from './reducers/addPlatform';
import removePlatform from './reducers/removePlatform';
import changeScheduleType from './reducers/changeScheduleType';
import updateCampaignSuccess from './reducers/updateCampaignSuccess';


export const initialState = {
  campaigns: [],
  error: '',
  tabIndex: 0,
  listLoading: false,
  loading: false,
  campaign: {},
  campaignSchedule: {}
};

export default handleActions({
  [CAMPAIGNS_LIST_REQUEST]: (state) => ({ ...state, listLoading: true, error: '' }),
  [CAMPAIGNS_LIST_SUCCESS]: (state, action) => ({ ...state, listLoading: false, campaigns: action.payload }),
  [CAMPAIGNS_LIST_ERROR]: (state, action) => ({ ...state, listLoading: false, error: action.payload }),
  [CAMPAIGN_CREATE_REQUEST]: (state) => ({ ...state, error: '' }),
  [CAMPAIGN_CREATE_SUCCESS]: (state, action) => ({ ...state, campaign: action.payload, tabIndex: state.tabIndex + 1 }),
  [CAMPAIGN_CREATE_ERROR]: (state, action) => ({ ...state, error: action.payload }),
  [CAMPAIGN_IMAGE_REQUEST]: (state) => ({ ...state, error: '' }),
  [CAMPAIGN_IMAGE_SUCCESS]: (state, action) => ({ ...state, campaign: action.payload }),
  [CAMPAIGN_IMAGE_ERROR]: (state, action) => ({ ...state, error: action.payload }),
  [CAMPAIGN_UPDATE_REQUEST]: (state) => ({ ...state, error: '' }),
  [CAMPAIGN_UPDATE_SUCCESS]: (state, action) => ({ ...state, campaign: action.payload, tabIndex: Math.min(state.tabIndex + 1, 5), campaigns: updateCampaignSuccess(state, action.payload) }),
  [CAMPAIGN_UPDATE_ERROR]: (state, action) => ({ ...state, error: action.payload }),
  [CAMPAIGN_SCHEDULE_REQUEST]: (state) => ({ ...state, error: '' }),
  [CAMPAIGN_SCHEDULE_SUCCESS]: (state, action) => ({
    ...state,
    campaign: {
      ...state.campaign,
      deliverySchedule: action.payload
    }
  }),
  [CAMPAIGN_SCHEDULE_ERROR]: (state, action) => ({ ...state, error: action.payload }),
  [CAMPAIGN_INIT_NEW]: (state) => ({
    ...state,
    tabIndex: 0,
    dirty: false,
    campaign: {
      title: '',
      tags: [],
      platform: [{
        name: 'android',
        displayType: ['dpi']
      }]
    },
    campaignSchedule: {
      type: 'schedule',
      schedule: {
        frequency: 'immediate',
        repeat: 'daily',
        sendDate: moment.utc().format(),
        timeZone: 'America/New_York'
      }
    }
  }),
  [CAMPAIGN_EDIT_SCHEDULE_FIELD]: (state, action) => ({
    ...state,
    dirty: true,
    campaignSchedule: {
      ...state.campaignSchedule,
      schedule: {
        ...state.campaignSchedule.schedule,
        [action.payload.field]: action.payload.value
      }
    }
  }),
  [CAMPAIGN_EDIT_FIELD]: (state, action) => ({
    ...state,
    dirty: true,
    campaign: {
      ...state.campaign,
      [action.payload.field]: action.payload.value
    }
  }),
  [CAMPAIGN_EDIT_DELIVERY_ACTION_FIELD]: (state, action) => ({
    ...state,
    dirty: true,
    campaign: {
      ...state.campaign,
      deliveryAction: {
        ...state.campaign.deliveryAction,
        [action.payload.field]: action.payload.value
      }
    }
  }),
  [CAMPAIGN_CHANGE_SCHEDULE_TYPE]: changeScheduleType,
  [CAMPAIGN_CHANGE_TAB_INDEX]: (state, action) => ({ ...state, tabIndex: state.campaign._id ? Math.min(action.payload, 5) : 0 }),
  [CAMPAIGN_READ_REQUEST]: (state) => ({ ...state, loading: true }),
  [CAMPAIGN_READ_SUCCESS]: (state, { payload }) => ({
    ...state,
    campaign: payload,
    campaignSchedule: {
      type: payload.deliverySchedule ? 'schedule' : '',
      schedule: payload.deliverySchedule
    },
    tabIndex: 0,
    loading: false
  }),
  [CAMPAIGN_READ_ERROR]: (state) => ({ ...state, loading: false }),
  [CAMPAIGN_ADD_PLATFORM]: addPlatform,
  [CAMPAIGN_REMOVE_PLATFORM]: removePlatform
}, initialState);
