import ResourceService from './ResourceService';

export default class CampaignService extends ResourceService {
  constructor(application_id, ...args) {
    const resource = `applications/${ application_id }/campaigns`;
    super(resource, ...args);
  }

  schedule(id, ...args) {
    return this._put(`/${ this.resource }/${ id }/schedule`, ...args);
  }

  cancelSchedule(id) {
    return this._delete(`/${ this.resource }/${ id }/schedule`);
  }

  uploadImage(id, ...args) {
    return this._post(`/${ this.resource }/${ id }/image`, ...args);
  }
}
