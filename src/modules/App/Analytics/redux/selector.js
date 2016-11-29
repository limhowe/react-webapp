import { createSelector } from 'reselect';
import moment from 'moment';
export const getDateFormat = (groupBy) => {
  let format = 'YYYY-MM-DD';
  if (groupBy === 'month') {
    format = 'YYYY-MM';
  } else if (groupBy === 'year') {
    format = 'YYYY';
  }
  return format;
};
export const getEventAnalyticsData = (state) => state.analytics.eventAnalytics;
export const getEventAnalyticsFilter = (state) => state.analytics.eventAnalyticsFilter;
export const getEventAnalyticsLabels = createSelector([getEventAnalyticsData, getEventAnalyticsFilter], (eventAnalytics, eventAnalyticsFilter) => {
  // get min, max date
  let minDate = moment();
  let maxDate = moment();

  Object.keys(eventAnalytics).forEach((eventId) => {
    const dataSeries = eventAnalytics[eventId];
    dataSeries.forEach((d) => {
      const newDate = moment([d._id.year, (d._id.month - 1) || 0, d._id.day || 1]);

      if (minDate.diff(newDate) > 0) {
        minDate = moment(newDate);
      }

      if (maxDate.diff(newDate) < 0) {
        maxDate = moment(newDate);
      }
    });
  });
  if (eventAnalyticsFilter.startDate) { minDate = moment(eventAnalyticsFilter.startDate); }
  if (eventAnalyticsFilter.endDate) { maxDate = moment(eventAnalyticsFilter.endDate); }

  // based on the groupBy, make up id array
  const idArr = [];
  for (let m = moment(minDate); m.isBefore(maxDate); m.add(1, eventAnalyticsFilter.groupBy)) {
    const format = getDateFormat(eventAnalyticsFilter.groupBy);
    idArr.push(m.format(format));
  }
  return idArr;
});

export const formattedEventAnalytics = createSelector([getEventAnalyticsData, getEventAnalyticsFilter, getEventAnalyticsLabels],
  (eventAnalytics, eventAnalyticsFilter, labels) => {
    const format = getDateFormat(eventAnalyticsFilter.groupBy);

    // make up series of data for chart available value
    const result = {};
    Object.keys(eventAnalytics).forEach((eventId) => {
      const data = {};
      // make up spaces first
      labels.forEach((label) => {
        data[label] = 0;
      });

      // set values
      const dataSeries = eventAnalytics[eventId];
      dataSeries.forEach((d) => {
        const newDate = moment([d._id.year, (d._id.month - 1) || 0, d._id.day || 1]);
        data[newDate.format(format)] = d.count;
      });

      result[eventId] = data;
    });

    return result;
  }
);
