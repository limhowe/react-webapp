import { createAction } from 'redux-actions';
import CampaignService from '../../../../api-services/CampaignService';

// campaigns list
export const CAMPAIGNS_LIST_REQUEST = 'campaign/list/request';
export const CAMPAIGNS_LIST_SUCCESS = 'campaign/list/success';
export const CAMPAIGNS_LIST_ERROR = 'campaign/list/error';

export const campaignsListRequest = createAction(CAMPAIGNS_LIST_REQUEST, () => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    campaignService.list({
      SUCCESS: CAMPAIGNS_LIST_SUCCESS,
      ERROR: CAMPAIGNS_LIST_ERROR
    });
  };
});

// campaign read
export const CAMPAIGN_READ_REQUEST = 'campaign/read/request';
export const CAMPAIGN_READ_SUCCESS = 'campaign/read/success';
export const CAMPAIGN_READ_ERROR = 'campaign/read/error';

export const campaignReadRequest = createAction(CAMPAIGN_READ_REQUEST, (id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.read(id, {
      SUCCESS: CAMPAIGN_READ_SUCCESS,
      ERROR: CAMPAIGN_READ_ERROR
    });
  };
});

// campaign create
export const CAMPAIGN_CREATE_REQUEST = 'campaign/create/request';
export const CAMPAIGN_CREATE_SUCCESS = 'campaign/create/success';
export const CAMPAIGN_CREATE_ERROR = 'campaign/create/error';

export const campaignCreateRequest = createAction(CAMPAIGN_CREATE_REQUEST, (data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.create(data, {
      SUCCESS: CAMPAIGN_CREATE_SUCCESS,
      ERROR: CAMPAIGN_CREATE_ERROR
    }, {
      successMessage: 'Campaign is created.'
    });
  };
});

// campaign update
export const CAMPAIGN_UPDATE_REQUEST = 'campaign/update/request';
export const CAMPAIGN_UPDATE_SUCCESS = 'campaign/update/success';
export const CAMPAIGN_UPDATE_ERROR = 'campaign/update/error';

export const campaignUpdateRequest = createAction(CAMPAIGN_UPDATE_REQUEST, (campaign_id, data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.update(campaign_id, data, {
      SUCCESS: CAMPAIGN_UPDATE_SUCCESS,
      ERROR: CAMPAIGN_UPDATE_ERROR
    });
  };
});

// campaign delete
export const CAMPAIGN_DELETE_REQUEST = 'campaign/update/request';
export const CAMPAIGN_DELETE_SUCCESS = 'campaign/update/success';
export const CAMPAIGN_DELETE_ERROR = 'campaign/update/error';

export const campaignDeleteRequest = createAction(CAMPAIGN_DELETE_REQUEST, (campaign_id) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.delete(campaign_id, {
      SUCCESS: CAMPAIGN_DELETE_SUCCESS,
      ERROR: CAMPAIGN_DELETE_ERROR
    }, {
      successMessage: 'Campaign is deleted.'
    });
  };
});

// campaign schedule
export const CAMPAIGN_SCHEDULE_REQUEST = 'campaign/schedule/request';
export const CAMPAIGN_SCHEDULE_SUCCESS = 'campaign/schedule/success';
export const CAMPAIGN_SCHEDULE_ERROR = 'campaign/schedule/error';

export const campaignScheduleRequest = createAction(CAMPAIGN_SCHEDULE_REQUEST, (campaign_id, data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.schedule(campaign_id, data, {
      SUCCESS: CAMPAIGN_SCHEDULE_SUCCESS,
      ERROR: CAMPAIGN_SCHEDULE_ERROR
    }, {
      successMessage: 'Nice, the campaign is scheduled.'
    });
  };
});

// campaign schedule
export const CAMPAIGN_IMAGE_REQUEST = 'campaign/image/request';
export const CAMPAIGN_IMAGE_SUCCESS = 'campaign/image/success';
export const CAMPAIGN_IMAGE_ERROR = 'campaign/image/error';

export const campaignImageRequest = createAction(CAMPAIGN_IMAGE_REQUEST, (campaign_id, data) => {
  return (dispatch, getState) => {
    const state = getState();
    const { application: { currentApp: { _id: appId } } } = state;
    const campaignService = new CampaignService(appId, dispatch, getState());
    return campaignService.uploadImage(campaign_id, data, {
      SUCCESS: CAMPAIGN_IMAGE_SUCCESS,
      ERROR: CAMPAIGN_IMAGE_ERROR
    }, {
      successMessage: 'Awesome, the image is added for the campaign.'
    });
  };
});

// here we do some serious refactoring

export const CAMPAIGN_INIT_NEW = 'campaign/init/new';
export const initNew = createAction(CAMPAIGN_INIT_NEW, () => {
  return  {
    title: '',
    tags: ['tag1', 'tag2'],
    platform: []
  };
});

export const CAMPAIGN_EDIT_FIELD = 'campaign/edit/set-field';
export const editCampaignField = createAction(CAMPAIGN_EDIT_FIELD, (field, value) => ({ field, value }));
export const CAMPAIGN_CHANGE_TAB = 'campaign/change/tab';
export const changeTab = createAction(CAMPAIGN_CHANGE_TAB, (nextTab) => nextTab);

export const CAMPAIGN_SAVE = 'campaign/save';
export const saveCampaignRequest = createAction(CAMPAIGN_SAVE, () => {
  return (dispatch, getState) => {
    const state = getState().campaign;
    const { campaign } = state;
    if (campaign && campaign._id) {
      return dispatch(campaignUpdateRequest(campaign._id, campaign));
    } else {
      return dispatch(campaignCreateRequest(campaign));
    }
    // } else {
    //   return dispatch(CAMPAIGN_CHANGE_TAB(tabIndex + 1));
    // }
  };
});
