import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, ProgressBar } from 'react-toolbox';
import AudienceTable from '../UserAnalytics/AudienceTable';
import CountryChart from '../../Dashboard/BubbleChart/CountryChart';
import { getCountryDataRequest } from '../../Dashboard/redux/actions';

export class LocationAnalytics extends Component {
  displayName: 'LocationAnalytics';
  state = {
    tabIndex: 0
  }

  componentWillMount() {
    this.props.getCountryData();
  }

  props: {
    countryData: Array<Object>,
    countryDataLoading: bool,
    countryDataLoaded: bool,
    getCountryData: Function
  }

  handleTabChange = (tabIndex) => {
    this.setState({ tabIndex });
  }

  render() {
    const { countryData, countryDataLoading, countryDataLoaded } = this.props;
    const model = {
      name: { title: 'Name' },
      email: { title: 'Email' },
      phone: { title: 'Phone' },
      language: { title: 'Lang' },
      country: { title: 'Country' },
      state: { title: 'State' },
      city: { title: 'City' },
      address: { title: 'Address' },
      lat: { title: 'Latitude' },
      lng: { title: 'Longitude' }
    };

    return (
      <div className="c-container__large">
        <h2>Analytics: Location</h2>
        <Tabs index={ this.state.tabIndex } onChange={ this.handleTabChange }>
          <Tab label="Location Map">
            <div className="c-container__center">
              { countryDataLoading ? <ProgressBar mode="indeterminate" type="circular" /> : null }
            </div>
            { countryDataLoaded && !countryDataLoading ? <CountryChart size="large" data={ countryData } /> : null }
          </Tab>
          <Tab label="Table">
            <AudienceTable model={ model } />
          </Tab>
        </Tabs>
      </div>
    );
  }
}


const mapStatesToProps = ({ dashboard: { countryData, countryDataLoaded, countryDataLoading } }) => ({
  countryData,
  countryDataLoaded,
  countryDataLoading
});

const mapDispatchToProps = (dispatch) => ({
  getCountryData: () => dispatch(getCountryDataRequest())
});

export default connect(mapStatesToProps, mapDispatchToProps)(LocationAnalytics);
