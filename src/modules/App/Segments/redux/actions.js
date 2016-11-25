import { createAction } from 'redux-actions';
import SegmentService from '../../../../api-services/SegmentService';

// list
export const SEGMENT_LIST_REQUEST = 'segment/list/request';
export const SEGMENT_LIST_SUCCESS = 'segment/list/success';
export const SEGMENT_LIST_ERROR = 'segment/list/error';

export const segmentListRequest = createAction(SEGMENT_LIST_REQUEST, () => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const segmentService = new SegmentService(appId, dispatch, getState());
    return segmentService.list({
      SUCCESS: SEGMENT_LIST_SUCCESS,
      ERROR: SEGMENT_LIST_ERROR
    });
  };
});
