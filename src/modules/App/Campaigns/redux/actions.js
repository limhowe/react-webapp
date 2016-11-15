import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import CampaignService from '../../../../api-services/CampaignService';

// campaigns list
export const CAMPAIGNS_LIST_REQUEST = 'campaigns/list/request';
export const CAMPAIGNS_LIST_SUCCESS = 'campaigns/list/success';
export const CAMPAIGNS_LIST_ERROR = 'campaigns/list/error';

export const campaignsListRequest = createAction(CAMPAIGNS_LIST_REQUEST, (application_id) => {
  return (dispatch, getState) => {
    const campaignService = new CampaignService(dispatch, getState);
    campaignService.list(application_id, {
      SUCCESS: CAMPAIGNS_LIST_SUCCESS,
      ERROR: CAMPAIGNS_LIST_ERROR
    }).then(() => {
      dispatch(push('/app/campaigns'));
    });
  };
});

export default {
  campaignsListRequest
};
