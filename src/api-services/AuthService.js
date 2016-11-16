import BaseService from './BaseService';

export default class AuthService extends BaseService {
  signin(...args) {
    return this._post('/auth/signin', ...args);
  }
}
