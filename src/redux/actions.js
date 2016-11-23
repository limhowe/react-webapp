import authActions from '../modules/App/Login/redux/actions';
import layoutActions from '../modules/Layout/redux/actions';
import appActions from '../modules/App/Applications/redux/actions';
import analyticsActions from '../modules/App/Analytics/redux/actions';

export default {
  ...authActions,
  ...layoutActions,
  ...appActions,
  ...analyticsActions
};
