import ResourceService from './ResourceService';

export default class SegmentService extends ResourceService {
  constructor(application_id, ...args) {
    const resource = `applications/${ application_id }/segments`;
    super(resource, ...args);
  }
}
