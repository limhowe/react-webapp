import ResourceService from './ResourceService';

export default class CustomEventService extends ResourceService {
  constructor(application_id, ...args) {
    const resource = `applications/${ application_id }/customEvents`;
    super(resource, ...args);
  }
}
