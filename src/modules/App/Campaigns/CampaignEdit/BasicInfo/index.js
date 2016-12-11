import React, { Component } from 'react';
import { Button, CardActions, Chip, Input } from 'react-toolbox/lib';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import { editCampaignField, saveCampaignRequest } from '../../redux/actions';
import { showNotification } from '../../../../Layout/redux/actions';

import DisplayType from './DisplayType';

export class BasicInfo extends Component {
  displayName: 'BasicInfo'
  state = {
    newtag: '',
    checkAndroid: true
  }
  props: {
    t: Function,
    campaign: Object,
    saveCampaign: Function,
    editCampaignField: Function,
    showNotification: Function
  }

  editField = (field) => (...args) => this.props.editCampaignField(field, ...args);

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  handleDeleteTag = (index) => {
    const { tags } = this.props.campaign;
    tags.splice(index, 1);
    this.props.editCampaignField('tags', tags);
  };

  handleNewTag = () => {
    const { newtag } = this.state;
    const { tags } = this.props.campaign;
    if (newtag) {
      tags.push(newtag);
      this.props.editCampaignField('tags', tags);
      this.setState({ newtag: '' });
    }
  };

  onChangeDisplayType = (platform) => {
    this.props.editCampaignField({ platform });
  }

  createCampaign = () => {
    if (!this.props.campaign.platform || this.props.campaign.platform.length === 0) {
      this.props.showNotification('error', `Please choose at least one platform.`);
      return;
    }
    for (let i = 0; i < this.props.campaign.platform.length; i++) {
      if (this.props.campaign.platform[i].displayType.length === 0) {
        this.props.showNotification('error', `Please choose one or more display type for ${ this.props.campaign.platform[i].name.toUpperCase() }.`);
        return;
      }
    }

    this.props.saveCampaign();
  }

  render() {
    const { t, campaign } = this.props;
    return (
      <div>
        <h3 className="tab-heading">{ t('campaigns.create.start.heading') }</h3>
        <div className="row">
          <div className="col-xs-12 col-md-7">
            <div className="form-field">
              <Input type="text" label={ t('campaigns.create.start.title') } name="title" value={ campaign.title } onChange={ this.editField('title') } />
            </div>
          </div>
          <div className="col-md-10">
            <div className="form-field">
              {
                campaign.tags.map((tag, index) => (
                  <Chip key={ index } deletable onDeleteClick={ this.handleDeleteTag.bind(this, index) }>{ tag }</Chip>
                ))
              }
            </div>
            <div className="form-field">
              <CardActions>
                <Input type="text" label={ t('campaigns.create.start.newTag') } name="newtag" value={ this.state.newtag } onChange={ (...args) => this.handleChange('newtag', ...args)  } />
                <Button onClick={ this.handleNewTag.bind(this) } icon="add" label={ t('campaigns.create.start.addTag') } raised mini />
              </CardActions>
            </div>
          </div>
        </div>
        <div className="form-field">
          <DisplayType platform="android" onChange={ this.onChangeDisplayType } />
        </div>
        <div className="form-field">
          <DisplayType platform="ios" onChange={ this.onChangeDisplayType } />
        </div>
        <div className="form-buttons">
          <Button onClick={ this.createCampaign.bind(this) } label={ t('campaigns.create.start.next') } raised primary />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign } }) => ({ campaign });

const mapDispatchToProps = (dispatch) => ({
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  saveCampaign: () => dispatch(saveCampaignRequest()),
  showNotification: (...args) => dispatch(showNotification(...args))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(BasicInfo));
