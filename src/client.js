import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';

import configureRoutes from './routes';
import i18n from './i18n';

// importing styles only once!
import styles from './styles'; // eslint-disable-line
import 'font-awesome/scss/font-awesome.scss';

import configureStore from './redux/store';

const store = configureStore(window.__INITIAL_STATE__);
const routes = configureRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);

if (__DEV__) {
  const { AppContainer } = require('react-hot-loader');

  const render = () => {
    const routes = require('./routes')(store); // eslint-disable-line no-shadow

    ReactDOM.render(
      <AppContainer>
        <Provider store={ store }>
          <I18nextProvider i18n={ i18n }>
            <Router routes={ routes } history={ history } />
          </I18nextProvider>
        </Provider>
      </AppContainer>,
      document.getElementById('app')
    );
  };
  render();

  // Hot reloading on the client
  if (module.hot) {
    module.hot.accept('./routes', render);
  }
} else {
  ReactDOM.render(
    <Provider store={ store }>
      <I18nextProvider i18n={ i18n }>
        <Router routes={ routes } history={ history } />
      </I18nextProvider>
    </Provider>,
    document.getElementById('app')
  );
}
