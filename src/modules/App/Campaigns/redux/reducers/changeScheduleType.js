import moment from 'moment';

export default (state, action) => {
  return {
    ...state,
    campaign: {
      ...state.campaign,
      expiresAt: action.payload === 'schedule' ? state.campaign.expiresAt : null
    },
    campaignSchedule: {
      type: action.payload,
      schedule: state.campaignSchedule.schedule || {
        frequency: 'immediate',
        repeat: 'once',
        sendDate: moment.utc().format(),
        timeZone: 'America/New_York'
      }
    }
  };
};
