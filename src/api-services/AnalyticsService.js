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
    const { offset, limit, segmentId } = params;
    return this._get(`/applications/${ this.appId }/analytics/getAudiences?offset=${ offset || 0 }&limit=${ limit || 10 }&segmentId=${ segmentId || '' }`, ...args);
  }

  getAudienceCount(...args) {
    return this._post(`/applications/${ this.appId }/analytics/getAudienceCounts`, ...args);
  }

  getAudienceCountByFilter(...args) {
    return this._post(`/applications/${ this.appId }/analytics/getAudienceCountByFilter`, ...args);
  }

  getEventAnalytics(params, ...args) {
    return this._get(`/applications/${ this.appId }/analytics/events?${ this.makeQueryString(params) }`, ...args);
  }
}
