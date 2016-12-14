import _ from 'lodash';
export default (state, payload) => {
  const campaigns = state.campaigns;
  const index = _.findIndex(campaigns, { _id: payload._id });
  if (index > -1) {
    campaigns[index] = payload;
  }
  return campaigns;
};
