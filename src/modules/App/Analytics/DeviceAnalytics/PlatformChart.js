import React, { Component } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const renderPercentageLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => { // eslint-disable-line
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const RADIAN = Math.PI / 180;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={ x } y={ y } textAnchor="middle" fill="#222" dominantBaseline="central">
      {`${ Math.round(percent * 100) }%`}
    </text>
  );
};

export default class PlatformChart extends Component { // eslint-disable-line
  displayName: 'PlatformChart'
  props: {
    width: number,
    height: number,
    deviceData: Object
  }

  render() {
    const { width, height, deviceData } = this.props;
    const data = [{ value: deviceData.Android.total, name: 'Android' }, { value: deviceData.iOS.total, name: 'iOS' }];
    return (
      <PieChart width={ width } height={ height }>
        <Pie
          data={ data }
          cx={ width / 2 }
          cy={ height / 2 }
          innerRadius={ width / 2 - 80 }
          outerRadius={ width / 2 - 20 }
          startAngle={ 90 }
          endAngle={ -270 }
          label={ renderPercentageLabel }
          labelLine={ false }
        >
          <Cell fill="#d4dd63" />
          <Cell fill="#60c0ec" />
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}
