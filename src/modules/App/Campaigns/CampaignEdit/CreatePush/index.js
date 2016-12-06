import React, { Component } from 'react';
import { Button, Dropdown, IconButton, Input } from 'react-toolbox/lib';
import { ProgressBar } from 'react-toolbox';
import { List, ListItem } from 'react-toolbox/lib/list';
import Dropzone from 'react-dropzone';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './styles.scss';

import { changeTabIndex, editCampaignField, campaignImageRequest, saveCampaignRequest } from '../../redux/actions';

export class CreatePush extends Component {
  displayName: 'CreatePush'
  state = {
    animationUploading: false,
    toggleSetDuration: false,
    toggleAddPushNotification: false
  }
  props: {
    t: Function,
    campaign: Object,
    changeTab: Function,
    editCampaignField: Function,
    uploadAnimation: Function,
    deleteAnimation: Function,
    saveCampaign: Function
  }

  loopCounts = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
    { value: 30 },
    { value: 50 }
  ];

  loopDelays = [
    { value: 10, text: '10 secs' },
    { value: 15, text: '15 secs' },
    { value: 30, text: '30 secs' },
    { value: 60, text: '1 min' },
    { value: 120, text: '2 mins' },
    { value: 300, text: '5 mins' }
  ];

  messagePositions = [
    { value: 'top', text: 'Top' },
    { value: 'center', text: 'Center' },
    { value: 'bottom', text: 'Bottom' }
  ];

  editField = (field) => (...args) => this.props.editCampaignField(field, ...args);

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
        this.props.uploadAnimation(this.props.campaign, payload).then(() => {
          this.setState({ animationUploading: false });
        });
      });
    }
  };

  deleteAnimation = () => {
    this.props.editCampaignField('animation', null);
    this.props.saveCampaign().then(() => {
      this.props.changeTab(1);
    });
    // this.props.deleteAnimation(this.props.campaign);
  }

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
    const animationClasses = classNames('animation-preview', 'on-mobile', {
      top: campaign.messagePosition === 'top',
      center: campaign.messagePosition === 'center',
      bottom: campaign.messagePosition === 'bottom'
    });
    return (
      <div>
        <h3 className="tab-heading">{ t('campaigns.create.createPush.heading') }</h3>
        <span>{ t('campaigns.create.createPush.addAnimation') }</span>
        <div><small className="text-muted">{ t('campaigns.create.createPush.addAnimationNote') }</small></div>
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-7">
                <div className="panel">
                  <IconButton icon="delete" className="pull-right" primary onClick={ this.deleteAnimation.bind(this) } />
                  <Dropzone onDrop={ this.onDrop } accept="image/gif" className="img-dropzone">
                    <List selectable ripple className="no-margin">
                      {
                        campaign.animation ? (
                          <ListItem
                            avatar={ campaign.animation.url }
                            caption={ t('campaigns.create.createPush.replaceAnimation') }
                            legend={ t('campaigns.create.createPush.chooseAnimationNote') }
                            theme={ styles }
                          />
                        ) : (
                        <ListItem
                          leftIcon="file_upload"
                          caption={ t('campaigns.create.createPush.chooseAnimation') }
                          legend={ t('campaigns.create.createPush.chooseAnimationNote') }
                        />
                        )
                      }
                    </List>
                  </Dropzone>
                  {
                    this.state.animationUploading ? (
                      <div className="c-container c-container__center">
                        <ProgressBar mode="indeterminate" type="linear" />
                      </div>
                    ) : null
                  }
                </div>
              </div>
              <div className="col-md-5">
                <div className="panel">
                  <List selectable ripple className="no-margin">
                    <ListItem
                      caption={ t('campaigns.create.createPush.createAnimation') }
                      legend={ t('campaigns.create.createPush.createAnimationNote') }
                    />
                  </List>
                </div>
              </div>
            </div>
            <div className="panel">
              <List selectable ripple className="no-margin">
                <ListItem
                  rightIcon="add"
                  caption={ t('campaigns.create.createPush.setDuration.heading') }
                  onClick={ () => { this.setState({ toggleSetDuration: !this.state.toggleSetDuration }); } }
                />
              </List>
              {
                this.state.toggleSetDuration ? (
                  <div className="row">
                    <div className="col-xs-12">
                      <label>{ t('campaigns.create.createPush.setDuration.loops') }</label>
                      <Dropdown
                        allowBlank={ false }
                        source={ this.loopCounts }
                        onChange={ this.editField('loopCount') }
                        label={ t('campaigns.create.createPush.setDuration.loopsNote') }
                        template={ this.dropDownItemTemplate }
                        value={ campaign.loopCount }
                      />
                      <label>{ t('campaigns.create.createPush.setDuration.delay') }</label>
                      <Dropdown
                        allowBlank={ false }
                        source={ this.loopDelays }
                        onChange={ this.editField('loopDelay') }
                        label={ t('campaigns.create.createPush.setDuration.delayNote') }
                        template={ this.dropDownItemTextTemplate }
                        value={ campaign.loopDelay }
                      />
                    </div>
                    {/* <div className="col-xs-12 col-lg-6 c-container__center">
                      <Button label={ t('campaigns.create.createPush.preview') } raised primary />
                    </div> */}
                  </div>
                ) : null
              }
            </div>
            <div className="panel">
              <List selectable ripple className="no-margin">
                <ListItem
                  rightIcon="add"
                  caption={ t('campaigns.create.createPush.addPushNotification.heading') }
                  onClick={ () => { this.setState({ toggleAddPushNotification: !this.state.toggleAddPushNotification }); } }
                />
              </List>
              {
                this.state.toggleAddPushNotification ? (
                  <div>
                    <Input type="text" multiline label={ t('campaigns.create.createPush.addPushNotification.enterNotification') } rows={ 3 } value={ campaign.message } onChange={ this.editField('message') } />
                    <small className="text-muted">{ t('campaigns.create.createPush.addPushNotification.forAndroidOnly') }</small>
                    <Dropdown
                      allowBlank={ false }
                      source={ this.messagePositions }
                      onChange={ this.editField('messagePosition') }
                      label={ t('campaigns.create.createPush.addPushNotification.selectScreenLocation') }
                      template={ this.dropDownItemTextTemplate }
                      value={ campaign.messagePosition }
                    />
                  </div>
                ) : null
              }
            </div>
            <div className="form-buttons">
              <Button icon="chevron_left" onClick={ () => changeTab(0) } label={ t('campaigns.create.createPush.back') } raised />
              <Button onClick={ saveCampaign } label={ t('campaigns.create.createPush.next') } raised primary />
            </div>
          </div>
          <div className="col-md-5">
            <h4 className="text-center">{ t('campaigns.create.createPush.mobilePreview') }</h4>
            <div className="mobile-preview">
              {
                campaign.animation ? (
                  <img className={ animationClasses } src={ campaign.animation.url } />
                ) : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaign } }) => ({ campaign });

const mapDispatchToProps = (dispatch) => ({
  changeTab: (index) => dispatch(changeTabIndex(index)),
  editCampaignField: (field, value) => dispatch(editCampaignField(field, value)),
  saveCampaign: () => dispatch(saveCampaignRequest()),
  uploadAnimation: (campaign, payload) => dispatch(campaignImageRequest(campaign._id, payload))
});

export default translate()(connect(mapStatesToProps, mapDispatchToProps)(CreatePush));
