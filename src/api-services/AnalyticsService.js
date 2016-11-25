import BaseAuthorizedService from './BaseAuthorizedService';

export default class AnalyticsService extends BaseAuthorizedService {
  constructor(appId, ...args) {
    super(...args);
    this.appId = appId;
  }

  getDevicesByPlatform(...args) {
    return this._get(`/applications/${ this.appId }/analytics/devicesByPlatform`, ...args);
  }

  getAudiences(params, ...args) {
    const { offset, limit } = params; // @TODO implement segmentId
    return this._get(`/applications/${ this.appId }/analytics/getAudiences?offset=${ offset || 0 }&limit=${ limit || 20 }`, ...args);
  }
}
