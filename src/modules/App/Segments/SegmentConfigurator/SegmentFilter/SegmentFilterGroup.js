import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, FontIcon } from 'react-toolbox';

import SegmentFilterItem from './SegmentFilterItem';
import { addFilteritem, toggleExpand } from '../../redux/actions';

import addButtonTheme from './styles/AddButton.scss';

export class SegmentFilterGroup extends Component {
  displayName: 'SegmentFilterGroup';
  props: {
    filters: Object,
    expanded: string,
    filterGroupId: string,
    addFilteritem: Function,
    toggleExpand: Function,
    t: Function
  }

  renderFilteritems() {
    const { filters, filterGroupId } = this.props;
    return filters.map((f, index) => (
      <SegmentFilterItem
        key={ `${ f }_${ index }` }
        filterGroupId={ filterGroupId }
        filterItemIndex={ index }
      />
    ));
  }

  renderAddItemButton() {
    return (
      <Button theme={ addButtonTheme } icon="add" label="Add Attribute" onClick={ this.props.addFilteritem } />
    );
  }

  render() {
    const { t, filterGroupId, expanded } = this.props;
    const icon = expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    return (
      <div className="c-segment-filter-group">
        <div className="c-segment-filter-group-heading" onClick={ this.props.toggleExpand }>
          <h4><span>{ t(`segments.filterGroups.${ filterGroupId }`) }</span><FontIcon value={ icon } className="c-icon" /></h4>
        </div>
        <div className="c-segment-filter-group-body" style={ { display: expanded ? 'block' : 'none' } }>
          { this.renderFilteritems() }
          <div className="row">
            <div className="col-sm-offset-3 col-xs-offset-6">
              { this.renderAddItemButton() }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { currentSegment, expandStatus } }, { filterGroupId }) => ({
  filters: currentSegment.filter[filterGroupId],
  expanded: expandStatus[filterGroupId]
});

const mapDispatchToProps = (dispatch, { filterGroupId }) => ({
  addFilteritem: () => dispatch(addFilteritem(filterGroupId)),
  toggleExpand: () => dispatch(toggleExpand(filterGroupId))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(SegmentFilterGroup)
);
