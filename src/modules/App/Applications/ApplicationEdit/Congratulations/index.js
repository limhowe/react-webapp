import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'react-toolbox';

import { initNew, changeCurrentApp } from '../../redux/actions';

export class Congratulations extends Component {
  displayName: 'Congratulations'

  props: {
    createAnother: Function,
    createCampaign: Function,
    changeCurrentApp: Function,
    activeApp: Object,
    t: Function
  }

  goToCampaign = () => {
    this.props.changeCurrentApp(this.props.activeApp);
    this.props.createCampaign();
  }

  render() {
    const { t, createAnother } = this.props;
    return (
      <div>
        <h2>{ t('applications.congratulations') }</h2>
        <p>{ t('applications.congratsMessage', { applicationName: __APP_CONFIG__.APP_NAME }) }</p>
        <Button label={ t('applications.registerAnotherApp') } primary raised onClick={ createAnother } /> &nbsp;
        <Button label={ t('applications.createCampaign') } primary raised onClick={ this.goToCampaign } />
      </div>
    );
  }
}

const mapStateToProps = ({ application: { activeApp } }) => ({ activeApp });
const mapDispatchToProps = (dispatch) => ({
  changeCurrentApp: (app) => dispatch(changeCurrentApp(app)),
  createAnother: () => {
    dispatch(initNew());
    dispatch(push('/app/applications/new'));
  },
  createCampaign: () => dispatch(push('/app/campaigns'))
});

export default translate()(connect(mapStateToProps, mapDispatchToProps)(Congratulations));
