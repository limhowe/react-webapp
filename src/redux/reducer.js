import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { AUTH_SIGNOUT_SUCCESS } from '../modules/App/Auth/redux/actions';

import auth from '../modules/App/Auth/redux/reducer';
import layout from '../modules/Layout/redux/reducer';
import application from '../modules/App/Applications/redux/reducer';
import campaign from '../modules/App/Campaigns/redux/reducer';
import analytics from '../modules/App/Analytics/redux/reducer';
import segments from '../modules/App/Segments/redux/reducer';
import customEvents from '../modules/App/CustomEvents/redux/reducer';
import dashboard from '../modules/App/Dashboard/redux/reducer';
import superdashboard from '../modules/App/SuperDashboard/redux/reducer';

import persist from './reducers/persistReducer';

const reducer = combineReducers({
  auth,
  layout,
  persist,
  application,
  campaign,
  analytics,
  segments,
  customEvents,
  dashboard,
  superdashboard,
  form: formReducer,
  routing: routerReducer
});

const rootReducer = (state, action) => {
  if (action.type === AUTH_SIGNOUT_SUCCESS) {
    state.application = undefined; // eslint-disable-line
  }

  return reducer(state, action);
};

export default rootReducer;
