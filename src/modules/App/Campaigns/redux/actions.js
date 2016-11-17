import { createAction } from 'redux-actions';
import CampaignService from '../../../../api-services/CampaignService';

// campaigns list
export const CAMPAIGNS_LIST_REQUEST = 'campaigns/list/request';
export const CAMPAIGNS_LIST_SUCCESS = 'campaigns/list/success';
export const CAMPAIGNS_LIST_ERROR = 'campaigns/list/error';

export const campaignsListRequest = createAction(CAMPAIGNS_LIST_REQUEST, (application_id) => {
  return (dispatch, getState) => {
    const campaignService = new CampaignService(application_id, dispatch, getState());
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

export const campaignCreateRequest = createAction(CAMPAIGN_CREATE_REQUEST, (application_id, data) => {
  return (dispatch, getState) => {
    const campaignService = new CampaignService(application_id, dispatch, getState());
    campaignService.create(data, {
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

export const campaignUpdateRequest = createAction(CAMPAIGN_UPDATE_REQUEST, (application_id, campaign_id, data) => {
  return (dispatch, getState) => {
    const campaignService = new CampaignService(application_id, dispatch, getState());
    return campaignService.update(campaign_id, data, {
      SUCCESS: CAMPAIGN_UPDATE_SUCCESS,
      ERROR: CAMPAIGN_UPDATE_ERROR
    });
  };
});

// campaign schedule
export const CAMPAIGN_SCHEDULE_REQUEST = 'campaigns/schedule/request';
export const CAMPAIGN_SCHEDULE_SUCCESS = 'campaigns/schedule/success';
export const CAMPAIGN_SCHEDULE_ERROR = 'campaigns/schedule/error';

export const campaignScheduleRequest = createAction(CAMPAIGN_SCHEDULE_REQUEST, (application_id, campaign_id, data) => {
  return (dispatch, getState) => {
    const campaignService = new CampaignService(application_id, dispatch, getState());
    campaignService.schedule(campaign_id, data, {
      SUCCESS: CAMPAIGN_SCHEDULE_SUCCESS,
      ERROR: CAMPAIGN_SCHEDULE_ERROR
    }, {
      successMessage: 'Nice, the campaign is scheduled.'
    });
  };
});

export default {
  campaignsListRequest,
  campaignCreateRequest,
  campaignUpdateRequest
};
