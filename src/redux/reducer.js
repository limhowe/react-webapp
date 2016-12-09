import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from '../modules/App/Auth/redux/reducer';
import layout from '../modules/Layout/redux/reducer';
import application from '../modules/App/Applications/redux/reducer';
import campaign from '../modules/App/Campaigns/redux/reducer';
import analytics from '../modules/App/Analytics/redux/reducer';
import segments from '../modules/App/Segments/redux/reducer';
import customEvents from '../modules/App/CustomEvents/redux/reducer';
import dashboard from '../modules/App/Dashboard/redux/reducer';
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
  form: formReducer,
  routing: routerReducer
});

export default reducer;
