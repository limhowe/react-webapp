import { createSelector } from 'reselect';
import { LOGICAL_OPERATORS } from '../../../../constants/Filter';

export const getSegmentFilter = (state) => state.segments.currentSegment.filter;

export const formattedFilter = createSelector([getSegmentFilter],
  (filter) => {
    let filters = [];
    Object.keys(filter).forEach((filterGroupId) => {
      filters = [...filters, ...filter[filterGroupId]];
    });

    if (!filters.length) {
      return {};
    }

    const resultOr = [];
    const resultAnd = [];
    filters.forEach((f) => {
      const filterItem = {
        [f.filterName]: {
          [f.operator]: f.value
        }
      };
      if (f.logicalOperator === LOGICAL_OPERATORS.AND) {
        resultAnd.push(filterItem);
      } else if (f.logicalOperator === LOGICAL_OPERATORS.OR) {
        resultOr.push(filterItem);
      }
    });

    return {
      [LOGICAL_OPERATORS.OR]: [
        {
          [LOGICAL_OPERATORS.AND]: resultAnd
        },
        ...resultOr
      ]
    };
  }
);
