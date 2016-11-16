import authActions from '../modules/App/Login/redux/actions';
import layoutActions from '../modules/Layout/redux/actions';
import appActions from '../modules/App/Applications/redux/actions';

export default {
  ...authActions,
  ...layoutActions,
  ...appActions
};
