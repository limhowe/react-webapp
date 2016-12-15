import { handleActions } from 'redux-actions';
import _ from 'lodash';
import {
  SEGMENT_LIST_REQUEST,
  SEGMENT_LIST_SUCCESS,
  SEGMENT_LIST_ERROR,
  SEGMENT_INIT_NEW,
  SEGMENT_UPDATE_SELECTED_LOGICAL_OPERATOR,
  SEGMENT_UPDATE_SELECTED_FILTER,
  SEGMENT_UPDATE_SELECTED_OPERATOR,
  SEGMENT_UPDATE_SELECTED_VALUE,
  SEGMENT_ADD_FILTER_ITEM,
  SEGMENT_REMOVE_FILTER_ITEM,
  SEGMENT_UPDATE_NAME,
  TOGGLE_EXPAND_STATUS,
  SEGMENT_PREVIEW_REQUEST,
  SEGMENT_PREVIEW_SUCCESS,
  SEGMENT_PREVIEW_ERROR,
  SEGMENT_UPDATE_REQUEST,
  SEGMENT_UPDATE_SUCCESS,
  SEGMENT_UPDATE_ERROR,
  SEGMENT_CREATE_REQUEST,
  SEGMENT_CREATE_SUCCESS,
  SEGMENT_CREATE_ERROR,
  SEGMENT_READ_REQUEST,
  SEGMENT_READ_SUCCESS,
  SEGMENT_READ_ERROR,
  SEGMENT_SET_CURRENT,
  SEGMENT_SET_DISPLAY_LIST,
  SEGMENT_UPDATE_FAVORITE,
  SEGMENT_SET_FILTER,
  SEGMENT_DELETE_FROM_LIST
} from './actions';
import { FILTER_GROUPS, AVAILABLE_FILTERS, LOGICAL_OPERATORS, OPERATOR_SETS, FILTER_VALUE_TYPE } from '../../../../constants/Filter';

const getInitialFilters = () => ({
  [FILTER_GROUPS.USER_ATTRIBUTES]: [],
  [FILTER_GROUPS.LOCATION]: [],
  [FILTER_GROUPS.USER_ACTIVIY_ATTRIBUTES]: [],
  [FILTER_GROUPS.DEVICE_AND_APP]: []
});

export const initialState = {
  segments: [],
  displayList: [],
  currentSegment: {
    id: 'new',
    name: '',
    favorite: false,
    filter: getInitialFilters()
  },
  listLoading: false,
  saving: false,
  reading: false,
  expandStatus: {},
  previewCount: { total: 0, count: 0 },
  previewLoading: false,
  filter: {}
};

export const reduceSegment = (state, segment) => {
  const feSegment = {
    id: segment._id,
    name: segment.name,
    favorite: segment.favorite,
    filter: getInitialFilters()
  };

  const parsedFilter = JSON.parse(segment.filter);
  const expandStatus = {};

  if (parsedFilter[LOGICAL_OPERATORS.OR]) {
    // first item is always AND list
    const [
      {
        [LOGICAL_OPERATORS.AND]: andFilters
      },
      ...orFilters
    ] = parsedFilter[LOGICAL_OPERATORS.OR];

    Object.keys(FILTER_GROUPS).forEach((filterGroupId) => {
      andFilters.forEach((filter) => {
        const filterName = Object.keys(filter)[0];
        const operator = Object.keys(filter[filterName])[0];
        const value = filter[filterName][operator];
        if (AVAILABLE_FILTERS[filterGroupId].indexOf(filterName) > -1) {
          feSegment.filter[filterGroupId].push({
            filterName, operator, value, logicalOperator: LOGICAL_OPERATORS.AND
          });
          expandStatus[filterGroupId] = true;
        }
      });

      orFilters.forEach((filter) => {
        const filterName = Object.keys(filter)[0];
        const operator = Object.keys(filter[filterName])[0];
        const value = filter[filterName][operator];
        if (AVAILABLE_FILTERS[filterGroupId].indexOf(filterName) > -1) {
          feSegment.filter[filterGroupId].push({
            filterName, operator, value, logicalOperator: LOGICAL_OPERATORS.OR
          });
          expandStatus[filterGroupId] = true;
        }
      });
    });
  }

  return {
    ...state,
    expandStatus,
    currentSegment: feSegment
  };
};


const updateArray = (arr, index, key, val) => {
  const newArr = [...arr];
  newArr[index] = {
    ...newArr[index],
    [key]: val
  };
  return newArr;
};

const removeArrayItem = (arr, index) => {
  const newArr = [...arr];
  newArr.splice(index, 1);
  if (newArr.length === 1) {
    newArr[0].logicalOperator = LOGICAL_OPERATORS.AND;
  }
  return newArr;
};

export default handleActions({
  [SEGMENT_LIST_REQUEST]: (state) => ({
    ...state,
    segments: [],
    displayList: [],
    listLoading: true
  }),
  [SEGMENT_LIST_SUCCESS]: (state, action) => ({
    ...state,
    segments: action.payload,
    displayList: action.payload,
    listLoading: false
  }),
  [SEGMENT_LIST_ERROR]: (state) => ({
    ...state,
    listLoading: false
  }),
  [SEGMENT_UPDATE_REQUEST]: (state) => ({ ...state, saving: true }),
  [SEGMENT_UPDATE_SUCCESS]: (state) => ({ ...state, saving: false }),
  [SEGMENT_UPDATE_ERROR]: (state) => ({ ...state, saving: false }),
  [SEGMENT_READ_REQUEST]: (state) => ({ ...state, reading: true }),
  [SEGMENT_READ_SUCCESS]: (state) => ({ ...state, reading: false }),
  [SEGMENT_READ_ERROR]: (state) => ({ ...state, reading: false }),
  [SEGMENT_CREATE_REQUEST]: (state) => ({ ...state, saving: true }),
  [SEGMENT_CREATE_SUCCESS]: (state, { payload }) => ({
    ...state,
    saving: false,
    currentSegment: {
      ...state.currentSegment,
      id: payload._id
    }
  }),
  [SEGMENT_CREATE_ERROR]: (state) => ({ ...state, saving: false }),
  [SEGMENT_SET_CURRENT]: (state, { payload }) => (payload ? reduceSegment(state, payload) : {
    ...state,
    currentSegment: {
      id: 'new',
      filter: getInitialFilters(),
      name: ''
    }
  }),
  [SEGMENT_INIT_NEW]: (state) => ({
    ...state,
    currentSegment: {
      id: 'new',
      filter: getInitialFilters(),
      name: ''
    }
  }),
  [SEGMENT_UPDATE_SELECTED_LOGICAL_OPERATOR]: (state, { payload: { filterGroupId, filterItemIndex, logicalOperator } }) => ({
    ...state,
    currentSegment: {
      ...state.currentSegment,
      filter: {
        ...state.currentSegment.filter,
        [filterGroupId]: updateArray(state.currentSegment.filter[filterGroupId], filterItemIndex, 'logicalOperator', logicalOperator)
      }
    }
  }),
  [SEGMENT_UPDATE_SELECTED_FILTER]: (state, { payload: { filterGroupId, filterItemIndex, filterName } }) => ({
    ...state,
    currentSegment: {
      ...state.currentSegment,
      filter: {
        ...state.currentSegment.filter,
        [filterGroupId]: updateArray(state.currentSegment.filter[filterGroupId], filterItemIndex, 'filterName', filterName)
      }
    }
  }),
  [SEGMENT_UPDATE_SELECTED_OPERATOR]: (state, { payload: { filterGroupId, filterItemIndex, operator } }) => ({
    ...state,
    currentSegment: {
      ...state.currentSegment,
      filter: {
        ...state.currentSegment.filter,
        [filterGroupId]: updateArray(state.currentSegment.filter[filterGroupId], filterItemIndex, 'operator', operator)
      }
    }
  }),
  [SEGMENT_UPDATE_SELECTED_VALUE]: (state, { payload: { filterGroupId, filterItemIndex, value } }) => ({
    ...state,
    currentSegment: {
      ...state.currentSegment,
      filter: {
        ...state.currentSegment.filter,
        [filterGroupId]: updateArray(state.currentSegment.filter[filterGroupId], filterItemIndex, 'value', value)
      }
    }
  }),
  [SEGMENT_ADD_FILTER_ITEM]: (state, { payload }) => ({
    ...state,
    currentSegment: {
      ...state.currentSegment,
      filter: {
        ...state.currentSegment.filter,
        [payload]: [
          ...state.currentSegment.filter[payload],
          {
            logicalOperator: LOGICAL_OPERATORS.AND,
            operator: OPERATOR_SETS[FILTER_VALUE_TYPE[AVAILABLE_FILTERS[payload][0]]][0],
            filterName: AVAILABLE_FILTERS[payload][0],
            value: ''
          }
        ]
      }
    }
  }),
  [SEGMENT_REMOVE_FILTER_ITEM]: (state, { payload: { filterGroupId, filterItemIndex } }) => ({
    ...state,
    currentSegment: {
      ...state.currentSegment,
      filter: {
        ...state.currentSegment.filter,
        [filterGroupId]: removeArrayItem(state.currentSegment.filter[filterGroupId], filterItemIndex)
      }
    }
  }),
  [SEGMENT_UPDATE_NAME]: (state, { payload }) => ({
    ...state,
    currentSegment: {
      ...state.currentSegment,
      name: payload
    }
  }),
  [SEGMENT_UPDATE_FAVORITE]: (state, { payload }) => ({
    ...state,
    currentSegment: {
      ...state.currentSegment,
      favorite: payload
    }
  }),
  [TOGGLE_EXPAND_STATUS]: (state, { payload }) => ({
    ...state,
    expandStatus: {
      ...state.expandStatus,
      [payload]: !state.expandStatus[payload]
    }
  }),
  [SEGMENT_PREVIEW_REQUEST]: (state) => ({
    ...state,
    previewCount: { total: 0, count: 0 },
    previewLoading: true
  }),
  [SEGMENT_PREVIEW_SUCCESS]: (state, action) => ({
    ...state,
    previewCount: action.payload,
    previewLoading: false
  }),
  [SEGMENT_PREVIEW_ERROR]: (state) => ({
    ...state,
    previewLoading: false
  }),
  [SEGMENT_SET_DISPLAY_LIST]: (state, { payload }) => ({
    ...state,
    displayList: payload
  }),
  [SEGMENT_SET_FILTER]: (state, { payload }) => ({ ...state, filter: payload }),
  [SEGMENT_DELETE_FROM_LIST]: (state, { payload }) => ({
    ...state,
    displayList: _.filter(state.displayList, (s) => s._id !== payload)
  })
}, initialState);
