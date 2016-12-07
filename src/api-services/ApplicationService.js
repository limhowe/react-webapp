import ResourceService from './ResourceService';

export default class ApplicationService extends ResourceService {
  constructor(...args) {
    super('applications', ...args);
  }

  uploadPem(id, fileName, passPhrase, formData, ...args) {
    // formData is instance of FormData
    return this._post(`/applications/${ id }/pem?fileName=${ fileName }&passPhrase=${ passPhrase }`, formData, ...args);
  }

  uploadImage(formData, ...args) {
    return this._post('/images/upload', formData, ...args);
  }
}
