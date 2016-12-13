import { createSelector } from 'reselect';
import _ from 'lodash';
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

export const getSegmentList = (state) => state.segments.displayList;
export const getCampaignList = (state) => state.campaign.campaigns;
export const getAudienceCounts = (state) => state.analytics.audienceCounts;

export const fullSegmentList = createSelector([getSegmentList, getCampaignList, getAudienceCounts],
  (segments, campaigns, counts) => {
    return segments.map((s) => {
      s.campaigns = _.filter(campaigns, (c) => (s._id === c.segment && (c.status === 'ACTIVE' || c.status === 'PAUSED' || c.status === 'DRAFT')));
      s.audienceCount = counts[s._id] || 0;
      s.active = s.campaigns.length;
      return s;
    });
  }
);
