import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import SegmentFilterGroup from './SegmentFilterGroup';

export class SegmentFilter extends Component {
  displayName: 'SegmentFilter';
  props: {
    filter: Object
  }

  renderFilterGroups() {
    const { filter } = this.props;
    return Object.keys(filter).map((fg) => (
      <SegmentFilterGroup
        key={ fg }
        filterGroupId={ fg }
      />
    ));
  }

  render() {
    return (
      <div className="c-segment-filters">
        <small>Select filters to be included in this segment</small>
        { this.renderFilterGroups() }
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { currentSegment } }) => ({
  filter: currentSegment.filter,
  currentSegment
});

export default translate()(
  connect(mapStatesToProps)(SegmentFilter)
);
