import BaseService from './BaseService';

export default class BaseAuthorizedService extends BaseService {
  constructor(dispatch, getState) {
    super(dispatch, getState);
    const state = getState();
    if (state && state.user && state.user.token) {
      this.headers = Object.assign({}, this.headers, {
        'x-access-token': state.user.token
      });
    }
  }
}
