import React, { Component } from 'react';
import CountryData from 'country-data';
import Highcharts from 'highcharts/highmaps';
import mapData from './mapData.json';

const lookup = CountryData.lookup;

export class CountryChart extends Component {
  displayName: 'CountryChart';

  componentDidMount() {
    const data = this.props.data.map((d) => ({
      ...d,
      code: lookup.countries({ name: d._id })[0] ? lookup.countries({ name: d._id })[0].alpha2 : ''
    }));

    Highcharts.mapChart('mapContainer', {
      chart: {
        borderWidth: 0
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },
      series: [{
        name: 'Countries',
        color: '#E0E0E0',
        enableMouseTracking: false,
        mapData
      }, {
        type: 'mapbubble',
        name: 'DP Users',
        joinBy: ['iso-a2', 'code'],
        mapData,
        data,
        minSize: 4,
        maxSize: '10%',
        tooltip: {
          pointFormat: '{point._id}: {point.count}'
        }
      }]
    });
  }

  props: {
    data: Array<Object>
  }

  render() {
    return (
      <div>
        <div id="mapContainer" />
      </div>
    );
  }
}

export default CountryChart;
