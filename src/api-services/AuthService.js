import BaseService from './BaseService';

export default class AuthService extends BaseService {
  signin(...args) {
    return this._post('/auth/signin', ...args);
  }

  signup(...args) {
    return this._post('/auth/signup', ...args);
  }

  resendConfirmEmail(email, ...args) {
    return this._get(`/auth/sendConfirmEmail?email=${ email }`, ...args);
  }

  verifyAccount(params, ...args) {
    return this._get(`/auth/verifyAccount?${ this.makeQueryString(params) }`, ...args);
  }
}
