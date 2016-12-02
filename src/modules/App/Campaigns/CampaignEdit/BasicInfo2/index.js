import React, { Component } from 'react';
import { Button, Input, Checkbox, Chip } from 'react-toolbox/lib';
import { CardActions } from 'react-toolbox/lib/card';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';

import { editCampaignField, saveCampaignRequest } from '../../redux/actions';

export class BasicInfo extends Component {
  displayName: 'BasicInfo'
  state = {
    tags: ['Sales', 'Marketing', 'Finance']
  }
  props: {
    t: Function,
    campaign: Object,
    saveCampaign: Function,
    editCampaignField: Function
  }

  editField = (field) => (...args) => this.props.editCampaignField(field, ...args);

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleDeleteTag = (index) => {
    const { tags } = this.state;
    tags.splice(index, 1);
    this.setState({
      tags
    });
  };

  handleNewTag = () => {
    const { tags, newtag } = this.state;
    if (newtag === '') {
      return;
    } else {
      tags.push(newtag);
      this.setState({
        tags,
        newtag: ''
      });
    }
  };

  render() {
    const { t, saveCampaign, campaign } = this.props;
    const { tags } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-md-7">
            <div className="form-field">
              <h3>this is step 2</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign } }) => ({ campaign });

const mapDispatchToProps = (dispatch) => ({
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  saveCampaign: () => dispatch(saveCampaignRequest())
  // create: (payload) => dispatch(campaignCreateRequest(payload)),
  // update: (campaign, payload) => dispatch(campaignUpdateRequest(campaign._id, payload))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(BasicInfo));
