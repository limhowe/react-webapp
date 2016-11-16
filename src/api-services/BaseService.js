import request from 'superagent';
import { showNotification } from '../modules/Layout/redux/actions';

export default class BaseService {
  constructor(dispatch, state) {
    this.dispatch = dispatch;
    this.state = state;
  }

  apiUrl(url) {
    return `${ __CLIENT__ ? __APP_CONFIG__.API_URL : process.env.API_URL }${ url }`;
  }

  setHeaders(req) {
    if (this.headers) {
      Object.keys(this.headers).forEach((key) => {
        req.set(key, this.headers[key]);
      });
    }
  }

  _checkError(err) {
    const {
      response: {
        body,
        // @TODO implmeent 401, 403 error handling. perhaps need to dispatch logout?
        status // eslint-disable-line
      }
    } = err;
    this.dispatch(showNotification('error', body.error || body.message || 'Unknown Error'));
    // @TODO show notification by dispatching notificaiton action
  }

  _call(req, actionTypes = {}, additionalParams = {}) {
    const { SUCCESS, ERROR } = actionTypes;
    return new Promise((resolve, reject) => {
      req.then((resp) => {
        if (SUCCESS) {
          this.dispatch({
            type: SUCCESS,
            payload: resp.body
          });
        }

        // show success message if set in additional params
        if (additionalParams.successMessage) {
          this.dispatch(showNotification('success', additionalParams.successMessage));
        }
        resolve(resp.body);
      }).catch((err) => {
        this._checkError(err);
        if (ERROR) {
          this.dispatch({
            type: ERROR,
            payload: err && err.response && err.response.body ? err.response.body : err
          });
        }
        reject(err && err.response && err.response.body ? err.response.body : err);
      });
    });
  }

  _get(url, ...args) {
    const req = request.get(this.apiUrl(url));
    this.setHeaders(req);
    return this._call(req, ...args);
  }

  _post(url, data, ...args) {
    const req = request.post(this.apiUrl(url));
    this.setHeaders(req);
    req.send(data);
    return this._call(req, ...args);
  }

  _put(url, data, ...args) {
    const req = request.put(this.apiUrl(url));
    this.setHeaders(req);
    req.send(data);
    return this._call(req, ...args);
  }

  _delete(url, ...args) {
    const req = request.delete(this.apiUrl(url));
    this.setHeaders(req);
    return this._call(req, ...args);
  }
}
