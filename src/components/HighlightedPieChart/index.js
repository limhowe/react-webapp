import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import ActiveShape from './ActiveShape';

export default class HighlightedPieChart extends Component {
  displayName: 'HighlightedPieChart'
  props: {
    width: number,
    height: number,
    data: Array<Object>, // always length = 2
    colors: Array<string>
  }
  render() {
    const { width, height, data, colors } = this.props;
    return (
      <PieChart width={ width } height={ height }>
        <Pie
          activeIndex={ 0 } // activeIndex is always first one on this chart
          activeShape={ ActiveShape }
          data={ data }
          cx={ width / 2 }
          cy={ height / 2 }
          innerRadius={ 25 }
          outerRadius={ 50 }
          startAngle={ 90 }
          endAngle={ -270 }
          paddingAngle={ 0 }
        >
          <Cell fill={ colors[0] } />
          <Cell fill={ colors[1] } />
        </Pie>
      </PieChart>
    );
  }
}
