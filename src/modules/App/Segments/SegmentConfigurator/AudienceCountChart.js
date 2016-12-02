import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import _ from 'lodash';
import { Pie, PieChart, Cell } from 'recharts';

import { segmentPreviewRequest } from '../redux/actions';
import { formattedFilter } from '../redux/selector';

export class AudienceCountChart extends Component {
  displayName: 'AudienceCountChart'

  componentWillMount() {
    this.props.previewRequest(this.props.filter || {});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter && !_.isEqual(nextProps.filter, this.props.filter)) {
      this.props.previewRequest(nextProps.filter || {});
    }
  }

  props: {
    filter: Object,
    previewRequest: Function,
    previewCount: Object,
    previewLoading: bool
  }

  render() {
    const { previewCount } = this.props;
    const data = [{ name: 'preview', value: previewCount.count }, { name: 'all', value: previewCount.total - previewCount.count }];
    return (
      <div>
        <PieChart width={ 150 } height={ 150 }>
          <Pie data={ data } cx={ 75 } cy={ 75 } startAngle={ 90 } endAngle={ 540 } outerRadius={ 70 }>
            <Cell fill="#75e94a" />
            <Cell fill="#dddddd" />
          </Pie>
        </PieChart>
      </div>
    );
  }
}

const mapStatesToProps = (state) => ({
  filter: formattedFilter(state),
  previewCount: state.segments.previewCount,
  previewLoading: state.segments.previewLoading
});

const mapDispatchToProps = (dispatch) => ({
  previewRequest: (...args) => dispatch(segmentPreviewRequest(...args))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(AudienceCountChart)
);
