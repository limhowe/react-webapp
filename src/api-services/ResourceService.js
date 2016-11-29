import BaseAuthorizedService from './BaseAuthorizedService';

export default class ResourceService extends BaseAuthorizedService {
  constructor(resource, ...args) {
    super(...args);
    this.resource = resource;
  }

  create(...args) {
    return this._post(`/${ this.resource }`, ...args);
  }

  update(id, ...args) {
    return this._put(`/${ this.resource }/${ id }`, ...args);
  }

  delete(id, ...args) {
    return this._delete(`/${ this.resource }/${ id }`, ...args);
  }

  read(id, ...args) {
    return this._get(`/${ this.resource }/${ id }`, ...args);
  }

  list(...args) {
    return this._get(`/${ this.resource }`, ...args);
  }
}
