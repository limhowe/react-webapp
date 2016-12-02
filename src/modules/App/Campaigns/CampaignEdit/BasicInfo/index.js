import React, { Component } from 'react';
import { Button, Input, Checkbox, Chip } from 'react-toolbox/lib';
import { CardActions } from 'react-toolbox/lib/card';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import styles from './styles.scss';
import { editCampaignField, saveCampaignRequest } from '../../redux/actions';

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
    editCampaignField: Function
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
    if (newtag === '') {
      return;
    } else {
      tags.push(newtag);
      this.props.editCampaignField('tags', tags);
    }
    this.setState({ newtag: '' });
  };

  findPlatform = (p) => {
    const { platform } = this.props.campaign;
    return platform.findIndex((elem) => {
      return elem.name.toUpperCase() === p.toUpperCase();
    });
  }

  togglePlatform = (p) => {
    const { platform } = this.props.campaign;
    const index = this.findPlatform(p);
    if (index >= 0) {
      platform.splice(index, 1);
    } else {
      platform.push({
        name: p,
        displayType: []
      });
    }
    this.props.editCampaignField({ platform });
  }

  findDisplayType = (p, type) => {
    const index = this.findPlatform(p);
    if (index < 0) {
      return -1;
    }
    const platform = this.props.campaign.platform[index];
    return platform.displayType.findIndex((d) => {
      return d === type;
    });
  };

  toggleDisplayType = (p, type) => {
    const platform = this.props.campaign.platform[this.findPlatform(p)];
    const typeIndex = this.findDisplayType(p, type);
    if (typeIndex >= 0) {
      platform.displayType.splice(typeIndex, 1);
    }
    if (typeIndex < 0) {
      platform.displayType.push(type);
    }
    this.props.editCampaignField({ platform });
  };

  render() {
    const { t, campaign, saveCampaign } = this.props;
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
          <div>
            <Checkbox
              checked={ this.findPlatform('android') >= 0 }
              label={ t('campaigns.create.start.android') }
              onChange={ this.togglePlatform.bind(this, 'Android') }
              className="check-platform"
              theme={ styles }
            />
          </div>
          {
            this.findPlatform('android') >= 0 ? (
              <div>
                <Checkbox
                  checked={ this.findDisplayType('android', 'dpi') >= 0 }
                  label="Widget (DPI)"
                  onChange={ this.toggleDisplayType.bind(this, 'android', 'dpi') }
                  theme={ styles }
                />
                <Checkbox
                  checked={ this.findDisplayType('android', 'nova') >= 0 }
                  label="Nova (Icon Overlay)"
                  onChange={ this.toggleDisplayType.bind(this, 'android', 'nova') }
                  theme={ styles }
                />
                <Checkbox
                  checked={ this.findDisplayType('android', 'supernova') >= 0 }
                  label="Super Nova (Screen Overlay)"
                  onChange={ this.toggleDisplayType.bind(this, 'android', 'supernova') }
                  className="displayType"
                  theme={ styles }
                />
              </div>
            ) : null
          }
          <div>
            <Checkbox
              checked={ this.findPlatform('ios') >= 0 }
              label={ t('campaigns.create.start.apple') }
              onChange={ this.togglePlatform.bind(this, 'ios') }
              className="check-platform"
              theme={ styles }
            />
          </div>
        </div>
        <div className="form-buttons">
          <Button onClick={ saveCampaign } label={ t('campaigns.create.start.next') } raised primary />
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
