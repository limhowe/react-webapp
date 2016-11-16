import { createAction } from 'redux-actions';
import CampaignService from '../../../../api-services/CampaignService';

// campaign create
export const CAMPAIGN_CREATE_REQUEST = 'campaigns/create/request';
export const CAMPAIGN_CREATE_SUCCESS = 'campaigns/create/success';
export const CAMPAIGN_CREATE_ERROR = 'campaigns/create/error';

export const campaignCreateRequest = createAction(CAMPAIGN_CREATE_REQUEST, (application_id, data) => {
  return (dispatch, getState) => {
    const campaignService = new CampaignService(dispatch, getState);
    campaignService.create(application_id, data, {
      SUCCESS: CAMPAIGN_CREATE_SUCCESS,
      ERROR: CAMPAIGN_CREATE_ERROR
    }).then((campaign) => {
      console.log('created a campaign', campaign);
    });
  };
});


// campaign update
export const CAMPAIGN_UPDATE_REQUEST = 'campaigns/update/request';
export const CAMPAIGN_UPDATE_SUCCESS = 'campaigns/update/success';
export const CAMPAIGN_UPDATE_ERROR = 'campaigns/update/error';

export const campaignUpdateRequest = createAction(CAMPAIGN_UPDATE_REQUEST, (application_id, campaign_id, data) => {
  return (dispatch, getState) => {
    const campaignService = new CampaignService(dispatch, getState);
    campaignService.update(application_id, campaign_id, data, {
      SUCCESS: CAMPAIGN_UPDATE_SUCCESS,
      ERROR: CAMPAIGN_UPDATE_ERROR
    }).then((campaign) => {
      console.log('updated the campaign', campaign);
    });
  };
});


// campaign schedule
export const CAMPAIGN_SCHEDULE_REQUEST = 'campaigns/schedule/request';
export const CAMPAIGN_SCHEDULE_SUCCESS = 'campaigns/schedule/success';
export const CAMPAIGN_SCHEDULE_ERROR = 'campaigns/schedule/error';

export const campaignScheduleRequest = createAction(CAMPAIGN_SCHEDULE_REQUEST, (application_id, campaign_id, data) => {
  return (dispatch, getState) => {
    const campaignService = new CampaignService(dispatch, getState);
    campaignService.schedule(application_id, campaign_id, data, {
      SUCCESS: CAMPAIGN_SCHEDULE_SUCCESS,
      ERROR: CAMPAIGN_SCHEDULE_ERROR
    }).then((campaign) => {
      console.log('scheduled the campaign', campaign);
    });
  };
});


export default {
  campaignCreateRequest,
  campaignUpdateRequest
};
