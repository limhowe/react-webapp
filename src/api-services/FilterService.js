import ResourceService from './ResourceService';

export default class FilterService extends ResourceService {
  constructor(application_id, ...args) {
    const resource = `applications/${ application_id }/filters`;
    super(resource, ...args);
  }
}
