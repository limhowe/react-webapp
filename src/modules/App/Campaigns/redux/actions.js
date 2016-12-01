import { createAction } from 'redux-actions';
import CampaignService from '../../../../api-services/CampaignService';

// campaigns list
export const CAMPAIGNS_LIST_REQUEST = 'campaigns/list/request';
export const CAMPAIGNS_LIST_SUCCESS = 'campaigns/list/success';
export const CAMPAIGNS_LIST_ERROR = 'campaigns/list/error';

export const campaignsListRequest = createAction(CAMPAIGNS_LIST_REQUEST, () => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    campaignService.list({
      SUCCESS: CAMPAIGNS_LIST_SUCCESS,
      ERROR: CAMPAIGNS_LIST_ERROR
    });
  };
});

// campaign create
export const CAMPAIGN_CREATE_REQUEST = 'campaigns/create/request';
export const CAMPAIGN_CREATE_SUCCESS = 'campaigns/create/success';
export const CAMPAIGN_CREATE_ERROR = 'campaigns/create/error';

export const campaignCreateRequest = createAction(CAMPAIGN_CREATE_REQUEST, (data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.create(data, {
      SUCCESS: CAMPAIGN_CREATE_SUCCESS,
      ERROR: CAMPAIGN_CREATE_ERROR
    }, {
      successMessage: 'Campaign is created.'
    });
  };
});

// campaign update
export const CAMPAIGN_UPDATE_REQUEST = 'campaigns/update/request';
export const CAMPAIGN_UPDATE_SUCCESS = 'campaigns/update/success';
export const CAMPAIGN_UPDATE_ERROR = 'campaigns/update/error';

export const campaignUpdateRequest = createAction(CAMPAIGN_UPDATE_REQUEST, (campaign_id, data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.update(campaign_id, data, {
      SUCCESS: CAMPAIGN_UPDATE_SUCCESS,
      ERROR: CAMPAIGN_UPDATE_ERROR
    });
  };
});

// campaign delete
export const CAMPAIGN_DELETE_REQUEST = 'campaigns/update/request';
export const CAMPAIGN_DELETE_SUCCESS = 'campaigns/update/success';
export const CAMPAIGN_DELETE_ERROR = 'campaigns/update/error';

export const campaignDeleteRequest = createAction(CAMPAIGN_DELETE_REQUEST, (campaign_id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.delete(campaign_id, {
      SUCCESS: CAMPAIGN_DELETE_SUCCESS,
      ERROR: CAMPAIGN_DELETE_ERROR
    }, {
      successMessage: 'Campaign is deleted.'
    });
  };
});

// campaign schedule
export const CAMPAIGN_SCHEDULE_REQUEST = 'campaigns/schedule/request';
export const CAMPAIGN_SCHEDULE_SUCCESS = 'campaigns/schedule/success';
export const CAMPAIGN_SCHEDULE_ERROR = 'campaigns/schedule/error';

export const campaignScheduleRequest = createAction(CAMPAIGN_SCHEDULE_REQUEST, (campaign_id, data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.schedule(campaign_id, data, {
      SUCCESS: CAMPAIGN_SCHEDULE_SUCCESS,
      ERROR: CAMPAIGN_SCHEDULE_ERROR
    }, {
      successMessage: 'Nice, the campaign is scheduled.'
    });
  };
});

// campaign schedule
export const CAMPAIGN_IMAGE_REQUEST = 'campaigns/image/request';
export const CAMPAIGN_IMAGE_SUCCESS = 'campaigns/image/success';
export const CAMPAIGN_IMAGE_ERROR = 'campaigns/image/error';

export const campaignImageRequest = createAction(CAMPAIGN_IMAGE_REQUEST, (campaign_id, data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.uploadImage(campaign_id, data, {
      SUCCESS: CAMPAIGN_IMAGE_SUCCESS,
      ERROR: CAMPAIGN_IMAGE_ERROR
    }, {
      successMessage: 'Awesome, the image is added for the campaign.'
    });
  };
});
