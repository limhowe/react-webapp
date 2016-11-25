import { compose, applyMiddleware, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import localForage from 'localforage';
import { persistStore, autoRehydrate } from 'redux-persist';
import fsaThunkMiddleware from 'redux-fsa-thunk';
import thunk from 'redux-thunk';

import reducer from './reducer';

const middlewares = [
  routerMiddleware(browserHistory),
  fsaThunkMiddleware,
  thunk
];

const composedStore = compose(
  applyMiddleware(...middlewares),
  autoRehydrate(),
  __CLIENT__ && window.devToolsExtension ? window.devToolsExtension() : f => f,
)(createStore);

const configureStore = (initialState) => {
  const store = composedStore(reducer, initialState);
  persistStore(store, {
    storage: localForage,
    whitelist: ['auth', 'application']
  });
  return store;
};

export default configureStore;
