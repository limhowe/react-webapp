import BaseAuthorizedService from './BaseAuthorizedService';

export default class CampaignService extends BaseAuthorizedService {
  list(application_id, actionTypes) {
    return this._get(`/applications/${ application_id }/campaigns`, actionTypes);
  }

  create(application_id, data, actionTypes) {
    return this._post(`/applications/${ application_id }/campaigns`, data, actionTypes);
  }

  update(application_id, campaign_id, data, actionTypes) {
    return this._put(`/applications/${ application_id }/campaigns/${ campaign_id }`, data, actionTypes);
  }

  schedule(application_id, campaign_id, data, actionTypes) {
    return this._put(`/applications/${ application_id }/campaigns/${ campaign_id }/schedule`, data, actionTypes);
  }
}
