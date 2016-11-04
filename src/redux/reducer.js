import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from '../modules/App/Login/redux/reducer';
import layout from '../modules/Layout/redux/reducer';

const reducer = combineReducers({
  auth,
  layout,
  form: formReducer,
  routing: routerReducer
});

export default reducer;
