import i18next from 'i18next';
import enDefault from './en-default.json';

// NOTE:update it with i18next-xhr-backend if translations are getting too big for initial load

const instance = i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: enDefault
    }
  }
}, (err) => {
  if (err) {
    throw new Error('Loading i18next failed');
  }
});

export default instance;
