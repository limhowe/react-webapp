import { handleActions } from 'redux-actions';
import _ from 'lodash';
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
  CAMPAIGN_SAVE,
  CAMPAIGN_ADD_PLATFORM,
  CAMPAIGN_REMOVE_PLATFORM
} from './actions';

export const initialState = {
  campaigns: [],
  error: '',
  tabIndex: 0,
  listLoading: false,
  loading: false
};

export default handleActions({
  [CAMPAIGNS_LIST_REQUEST]: (state) => ({
    ...state,
    listLoading: true,
    error: ''
  }),
  [CAMPAIGNS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    listLoading: false,
    campaigns: action.payload
  }),
  [CAMPAIGNS_LIST_ERROR]: (state, action) => ({
    ...state,
    listLoading: false,
    error: action.payload
  }),
  [CAMPAIGN_CREATE_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGN_CREATE_SUCCESS]: (state, action) => ({
    ...state,
    campaign: action.payload,
    tabIndex: state.tabIndex + 1
  }),
  [CAMPAIGN_CREATE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CAMPAIGN_IMAGE_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGN_IMAGE_SUCCESS]: (state, action) => ({
    ...state,
    campaign: action.payload
  }),
  [CAMPAIGN_IMAGE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CAMPAIGN_UPDATE_REQUEST]: (state) => ({
    ...state,
    error: ''
  }),
  [CAMPAIGN_UPDATE_SUCCESS]: (state, action) => ({
    ...state,
    campaign: action.payload,
    tabIndex: Math.min(state.tabIndex + 1, 5)
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
    campaign: {
      ...state.campaign,
      deliverySchedule: action.payload
    }
  }),
  [CAMPAIGN_SCHEDULE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CAMPAIGN_INIT_NEW]: (state, action) => ({
    ...state,
    tabIndex: 0,
    dirty: false,
    campaign: Object.assign({}, action.payload)
  }),
  [CAMPAIGN_EDIT_FIELD]: (state, action) => ({
    ...state,
    dirty: true,
    campaign: {
      ...state.campaign,
      [action.payload.field]: action.payload.value
    }
  }),
  [CAMPAIGN_EDIT_SCHEDULE_FIELD]: (state, action) => ({
    ...state,
    dirty: true,
    campaign: {
      ...state.campaign,
      deliverySchedule: {
        ...state.campaign.deliverySchedule,
        [action.payload.field]: action.payload.value
      }
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
  [CAMPAIGN_CHANGE_TAB_INDEX]: (state, action) => ({
    ...state,
    tabIndex: state.campaign._id ? Math.min(action.payload, 5) : 0
  }),
  [CAMPAIGN_READ_REQUEST]: (state) => ({
    ...state,
    loading: true
  }),
  [CAMPAIGN_READ_SUCCESS]: (state, action) => ({
    ...state,
    campaign: action.payload,
    tabIndex: 0,
    loading: false
  }),
  [CAMPAIGN_READ_ERROR]: (state) => ({
    ...state,
    loading: false
  }),
  [CAMPAIGN_SAVE]: (state) => state,
  [CAMPAIGN_ADD_PLATFORM]: (state, { payload: { platform, displayType } }) => {
    const campaignPlatform = state.campaign.platform;
    const index = _.findIndex(campaignPlatform, { name: platform });
    let newDisplayTypeData = [];
    if (index === -1) {
      newDisplayTypeData = [...campaignPlatform, { name: platform, displayType }];
    } else {
      campaignPlatform.splice(index, 1);
      newDisplayTypeData = [...campaignPlatform, { name: platform, displayType }];
    }

    return {
      ...state,
      campaign: {
        ...state.campaign,
        platform: newDisplayTypeData
      }
    };
  },
  [CAMPAIGN_REMOVE_PLATFORM]: (state, { payload: { platform } }) => {
    const campaignPlatform = state.campaign.platform;
    const index = _.findIndex(campaignPlatform, { name: platform });
    let newDisplayTypeData = [];
    if (index === -1) {
      newDisplayTypeData = [...campaignPlatform];
    } else {
      campaignPlatform.splice(index, 1);
      newDisplayTypeData = [...campaignPlatform];
    }

    return {
      ...state,
      campaign: {
        ...state.campaign,
        platform: newDisplayTypeData
      }
    };
  }
}, initialState);
