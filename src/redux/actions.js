import authActions from '../modules/App/Login/redux/actions';
import layoutActions from '../modules/Layout/redux/actions';
import appActions from '../modules/App/Applications/redux/actions';
import analyticsActions from '../modules/App/Analytics/redux/actions';
import segmentsActions from '../modules/App/Segments/redux/actions';
import customEventsActions from '../modules/App/CustomEvents/redux/actions';

export default {
  ...authActions,
  ...layoutActions,
  ...appActions,
  ...analyticsActions,
  ...segmentsActions,
  ...customEventsActions
};
