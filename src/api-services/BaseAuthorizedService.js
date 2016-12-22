import BaseService from './BaseService';

export default class BaseAuthorizedService extends BaseService {
  constructor(dispatch, state, useBehalfToken = true) {
    super(dispatch, state);
    if (state && state.auth && state.auth.user) {
      if (state.auth.user.behalf && useBehalfToken) {
        this.headers = Object.assign({}, this.headers, {
          'x-access-token': state.auth.user.behalf.token
        });
      } else if (state.auth.user.token) {
        this.headers = Object.assign({}, this.headers, {
          'x-access-token': state.auth.user.token
        });
      }
    }
  }
}
