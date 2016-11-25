import { handleActions } from 'redux-actions';
import {
  SEGMENT_LIST_REQUEST,
  SEGMENT_LIST_SUCCESS,
  SEGMENT_LIST_ERROR
} from './actions';

export const initialState = {
  segments: [],
  listLoading: false
};

export default handleActions({
  [SEGMENT_LIST_REQUEST]: (state) => ({
    ...state,
    segments: [],
    listLoading: true
  }),
  [SEGMENT_LIST_SUCCESS]: (state, action) => ({
    ...state,
    segments: action.payload,
    listLoading: false
  }),
  [SEGMENT_LIST_ERROR]: (state) => ({
    ...state,
    listLoading: false
  })
}, initialState);
