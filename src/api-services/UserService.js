import ResourceService from './ResourceService';

export default class UserService extends ResourceService {
  constructor(...args) {
    super('users', ...args);
  }

  list(actionTypes, additionalParams) {
    return this._get(`/${ this.resource }?${ this.makeQueryString(additionalParams.query) }`, actionTypes, additionalParams);
  }

  fetchToken(userId, ...args) {
    return this._get(`/users/${ userId }/fetchToken`, ...args);
  }
}
