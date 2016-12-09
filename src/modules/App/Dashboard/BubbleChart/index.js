import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-toolbox';
import CountryChart from './CountryChart';
import styles from './styles.scss';

import { getCountryDataRequest } from '../redux/actions';

export class BubbleChart extends Component {
  displayName: 'BubbleChart';

  componentWillMount() {
    this.props.getCountryData();
  }

  props: {
    countryData: Array<Object>,
    countryDataLoading: bool,
    countryDataLoaded: bool,
    getCountryData: Function
  }

  render() {
    const { countryData, countryDataLoading, countryDataLoaded } = this.props;
    return (
      <div className={ styles.bubbleChart }>
        <h3>Locations</h3>
        <div className="c-container__center">
          { countryDataLoading ? <ProgressBar mode="indeterminate" type="circular" /> : null }
        </div>
        { countryDataLoaded && !countryDataLoading ? <CountryChart data={ countryData } /> : null }
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

export default connect(mapStatesToProps, mapDispatchToProps)(BubbleChart);
