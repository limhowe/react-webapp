import { handleActions } from 'redux-actions';
import { REHYDRATE } from 'redux-persist/constants';

/**
 * This reducer is used to determine when to render the app.
 * App will be rendered after all info is loaded from local forage.
 */
export default handleActions({
  [REHYDRATE]: (state) => ({
    ...state,
    loaded: true
  })
}, { loaded: false });
