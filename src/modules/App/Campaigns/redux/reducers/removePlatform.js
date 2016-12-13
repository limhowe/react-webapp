import _ from 'lodash';

export default (state, { payload: { platform } }) => {
  const campaignPlatform = state.campaign.platform;
  const index = _.findIndex(campaignPlatform, { name: platform });
  let newDisplayTypeData = [];
  if (index === -1) {
    newDisplayTypeData = [...campaignPlatform];
  } else {
    campaignPlatform.splice(index, 1);
    newDisplayTypeData = [...campaignPlatform];
  }

  return {
    ...state,
    campaign: {
      ...state.campaign,
      platform: newDisplayTypeData
    }
  };
};
