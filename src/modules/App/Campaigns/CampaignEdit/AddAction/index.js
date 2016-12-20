import React, { Component } from 'react';
import { Button, Dropdown, Input } from 'react-toolbox/lib';
import Dropzone from 'react-dropzone';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';

import { CAMPAIGN_TYPES } from '../../../../../constants/Campaign';
import { changeTabIndex, editCampaignField, saveCampaignRequest } from '../../redux/actions';

export class AddAction extends Component {
  displayName: 'AddAction'
  state = {
    headline: '',
    content: '',
    buttonLabel: '',
    buttonLink: ''
  }
  props: {
    t: Function,
    campaign: Object,
    changeTab: Function,
    editCampaignField: Function,
    uploadImage: Function,
    saveCampaign: Function
  }

  editField = (field) => (...args) => this.props.editCampaignField(field, ...args);

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  onDrop = (files) => {
    if (files.length === 0) {
      return;
    } else {
      this.setState({
        image: files[0]
      }, () => {
        this.setState({ animationUploading: true });
        const payload = new FormData();
        payload.append('image', this.state.image);
        this.props.uploadImage(this.props.campaign, payload).then(() => {
          this.setState({ animationUploading: false });
        });
      });
    }
  };

  dropDownItemTemplate(item) {
    return (
      <div>
        <strong>{ item.value }</strong>
      </div>
    );
  }

  dropDownItemTextTemplate(item) {
    return (
      <div>
        <strong>{ item.text }</strong>
      </div>
    );
  }

  render() {
    const { t, changeTab, saveCampaign, campaign } = this.props;
    const campaignTypes = Object.keys(CAMPAIGN_TYPES).map((key) => ({
      value: CAMPAIGN_TYPES[key],
      text: t(`campaigns.campaignTypes.${ CAMPAIGN_TYPES[key] }`)
    }));
    return (
      <div>
        <h3 className="tab-heading">{ t('campaigns.create.addAction.heading') }</h3>
        <div><small className="text-muted">{ t('campaigns.create.addAction.subtitle') }</small></div>
        <Dropdown
          allowBlank={ false }
          source={ campaignTypes }
          onChange={ this.editField('campaignType') }
          label={ t('campaigns.create.createPush.addPushNotification.selectScreenLocation') }
          template={ this.dropDownItemTextTemplate }
          value={ campaign.campaignType }
        />
        {
          campaign.campaignType === 'in-app-message' ? (
            <div className="row">
              <div className="col-xs-12 col-lg-5">
                <img src="http://live.dynamicpush.com/assets/cell.jpg" />
              </div>
              <div className="col-xs-12 col-lg-7">
                <div>
                  <Dropzone onDrop={ this.onDrop }>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                  </Dropzone>
                </div>
                <div className="form-field">
                  <Input type="text" label={ t('campaigns.create.addAction.template.headline') } name="headline" value={ this.state.headline } onChange={ this.handleChange.bind(this, 'headline') } />
                </div>
                <div className="form-field">
                  <Input type="text" multiline label={ t('campaigns.create.addAction.template.content') } name="content" value={ this.state.content } rows={ 3 } onChange={ this.handleChange.bind(this, 'content') } />
                </div>
                <div className="form-field">
                  <label>{ t('campaigns.create.addAction.template.callToAction') }</label>
                  <Input type="text" label={ t('campaigns.create.addAction.template.buttonLabel') } name="buttonLabel" value={ this.state.buttonLabel } onChange={ this.handleChange.bind(this, 'buttonLabel') } />
                  <Input type="text" label={ t('campaigns.create.addAction.template.buttonLink') } name="buttonLink" value={ this.state.buttonLink } onChange={ this.handleChange.bind(this, 'buttonLink') } />
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-6">
                <Input type="text" label={ t('campaigns.create.addAction.link.enterLink') } name="actionLink" value={ campaign.url } onChange={ this.editField('url') } />
              </div>
            </div>
          )
        }
        <div className="form-buttons">
          <Button icon="chevron_left" onClick={ () => changeTab(1) } label={ t('campaigns.create.addAction.back') } raised />
          <Button onClick={ saveCampaign } label={ t('campaigns.create.addAction.next') } raised primary />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign } }) => ({ campaign });

const mapDispatchToProps = (dispatch) => ({
  changeTab: (index) => dispatch(changeTabIndex(index)),
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  saveCampaign: () => dispatch(saveCampaignRequest())
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(AddAction));
