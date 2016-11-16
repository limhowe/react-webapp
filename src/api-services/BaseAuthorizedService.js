import BaseService from './BaseService';

export default class BaseAuthorizedService extends BaseService {
  constructor(...args) {
    super(...args);
    const state = this.state;
    if (state && state.auth && state.auth.user && state.auth.user.token) {
      this.headers = Object.assign({}, this.headers, {
        'x-access-token': state.auth.user.token
      });
    }
  }
}
