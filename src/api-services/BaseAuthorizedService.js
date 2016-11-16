import BaseService from './BaseService';

export default class BaseAuthorizedService extends BaseService {
  constructor() {
    super();
    const state = this.store.getState();
    if (state && state.auth && state.auth.user && state.auth.user.token) {
      this.headers = Object.assign({}, this.headers, {
        'x-access-token': state.user.token
      });
    }
  }
}
