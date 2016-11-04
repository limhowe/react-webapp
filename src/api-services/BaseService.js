import request from 'superagent';
import { showNotification } from '../redux/actions';

export default class BaseService {
  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  apiUrl(url) {
    return `${ __APP_CONFIG__.API_URL }${ url }`;
  }

  setHeaders(req) {
    if (this.headers) {
      this.headers.forEach((header) => {
        req.set(header[0], header[1]);
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

  _call(req, actionTypes) {
    const { SUCCESS, ERROR } = actionTypes;
    return new Promise((resolve, reject) => {
      req.then((resp) => {
        if (SUCCESS) {
          this.dispatch({
            type: SUCCESS,
            payload: resp.body
          });
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

  _get(url, actionTypes) {
    const req = request.get(this.apiUrl(url));
    this.setHeaders(req);
    return this._call(req, actionTypes);
  }

  _post(url, data, actionTypes) {
    const req = request.post(this.apiUrl(url));
    this.setHeaders(req);
    req.send(data);
    return this._call(req, actionTypes);
  }

  _put(url, data, actionTypes) {
    const req = request.put(this.apiUrl(url));
    this.setHeaders(req);
    req.send(data);
    return this._call(req, actionTypes);
  }

  _delete(url, actionTypes) {
    const req = request.delete(this.apiUrl(url));
    this.setHeaders(req);
    return this._call(req, actionTypes);
  }
}
