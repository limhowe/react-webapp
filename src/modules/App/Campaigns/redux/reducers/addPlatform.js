import _ from 'lodash';

export default (state, { payload: { platform, displayType } }) => {
  const campaignPlatform = state.campaign.platform;
  const index = _.findIndex(campaignPlatform, { name: platform });
  let newDisplayTypeData = [];
  if (index === -1) {
    newDisplayTypeData = [...campaignPlatform, { name: platform, displayType }];
  } else {
    campaignPlatform.splice(index, 1);
    newDisplayTypeData = [...campaignPlatform, { name: platform, displayType }];
  }

  return {
    ...state,
    campaign: {
      ...state.campaign,
      platform: newDisplayTypeData
    }
  };
};
