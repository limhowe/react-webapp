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
    }, {
      successMessage: 'Campaigns list loaded.'
    });
  };
});

export default {
  campaignsListRequest
};
