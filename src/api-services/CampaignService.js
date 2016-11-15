import BaseAuthorizedService from './BaseAuthorizedService';

export default class CampaignService extends BaseAuthorizedService {
  list(application_id, actionTypes) {
    return this._get(`/applications/${ application_id }/campaigns`, actionTypes);
  }
}
