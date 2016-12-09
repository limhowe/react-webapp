import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox';
import { Link } from 'react-router';
import _ from 'lodash';
import { push } from 'react-router-redux';

import CampaignProgress from './CampaignProgress';
import styles from './styles/CampaignPanel.scss';

export class CampaignPanel extends Component {
  displayName: 'CampaignPanel';

  props: {
    changeLocation: Function,
    campaigns: Array<Object>,
    campaignsLoading: boolean
  }

  newCampaign = () => this.props.changeLocation('/app/campaigns/start')

  render() {
    const { campaigns } = this.props;
    let activeCampaigns = _.filter(campaigns, { status: 'ACTIVE' }) || [];
    activeCampaigns = activeCampaigns.slice(0, 5);
    const progresses = activeCampaigns.map((campaign) => <CampaignProgress key={ campaign.title } campaign={ campaign } />);

    return (
      <div className={ styles.campaignPanel }>
        <h3>Campaigns in progress</h3>
        { progresses }
        <Link to="/app/campaigns"><small>View all campaigns</small></Link>
        <div className={ styles.actions }>
          <Button primary raised label="Create New Campaign" onClick={ this.newCampaign } />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ campaign: { campaigns, listLoading } }) => ({
  campaigns,
  campaignsLoading: listLoading
});

const mapDispatchToProps = (dispatch) => ({
  changeLocation: (...args) => dispatch(push(...args))
});

export default connect(mapStatesToProps, mapDispatchToProps)(CampaignPanel);
