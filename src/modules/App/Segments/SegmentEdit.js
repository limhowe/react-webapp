import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-toolbox';
import { push } from 'react-router-redux';

import { segmentReadRequest, initNewSegment } from './redux/actions';
import SegmentConfigurator from './SegmentConfigurator';

export class SegmentEdit extends Component {
  displayName: 'SegmentEdit'

  componentWillMount() {
    const segmentId = this.props.params && this.props.params.segmentId;
    if (segmentId === 'new') {
      this.props.initNewSegment();
    } else {
      this.props.readSegment(segmentId);
    }
  }

  props: {
    initNewSegment: Function,
    readSegment: Function,
    goToList: Function,
    reading: bool,
    params: Object
  }

  render() {
    const { reading } = this.props;
    if (reading) {
      return (
        <div className="c-container c-container__center">
          <ProgressBar mode="indeterminate" type="circular" multicolor />
        </div>
      );
    }

    return (
      <div className="c-container__large">
        <SegmentConfigurator onCancel={ this.props.goToList } />
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { reading } }) => ({
  reading
});

const mapDispatchToProps = (dispatch) => ({
  readSegment: (...args) => dispatch(segmentReadRequest(...args)),
  initNewSegment: (...args) => dispatch(initNewSegment(...args)),
  goToList: () => dispatch(push(`/app/audience`))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(SegmentEdit)
);
