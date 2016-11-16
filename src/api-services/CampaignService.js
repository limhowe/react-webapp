import ResourceService from './ResourceService';

export default class CampaignService extends ResourceService {
  constructor(application_id, ...args) {
    const resource = `applications/${ application_id }/campaigns`;
    super(resource, ...args);
  }
}
