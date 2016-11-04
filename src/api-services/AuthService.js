import BaseService from './BaseService';

export default class AuthService extends BaseService {
  signin(data, actionTypes) {
    return this._post('/auth/signin', data, actionTypes);
  }

  signout(actionTypes) {
    return this._get('/auth/signout', actionTypes);
  }
}
