import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Dropdown, Input, IconButton, Button } from 'react-toolbox';

import logicalButtonTheme from './styles/LogicalOperatorButton.scss';

import {
  updateSelectedLogicalOperator,
  updateSelectedFilter,
  updateSelectedOperator,
  updateSelectedValue,
  removeFilteritem
} from '../../redux/actions';
import { LOGICAL_OPERATORS, AVAILABLE_FILTERS, OPERATOR_SETS, FILTER_VALUE_TYPE  } from '../../../../../constants/Filter';

export class SegmentFilterItem extends Component {
  displayName: 'SegmentFilterItem';
  props: {
    filterGroupId: string,
    filterItemIndex: number,
    selectedFilterName: Object,
    selectedOperator: string,
    selectedValue: any,
    logicalOperator: string,
    updateSelectedLogicalOperator: Function,
    updateSelectedFilter: Function,
    updateSelectedOperator: Function,
    updateSelectedValue: Function,
    removeFilteritem: Function,
    t: Function
  }

  toggleLogicalOperator = () => {
    const indexMap = {};
    const { logicalOperator } = this.props;
    Object.keys(LOGICAL_OPERATORS).forEach((key, index) => {
      indexMap[LOGICAL_OPERATORS[key]] = index;
    });
    const opArray = Object.keys(LOGICAL_OPERATORS).map((key) => LOGICAL_OPERATORS[key]);
    this.props.updateSelectedLogicalOperator(opArray[(indexMap[logicalOperator] + 1) % opArray.length]);
  };

  renderJoinType() {
    const { t, logicalOperator, filterItemIndex } = this.props;
    if (filterItemIndex === 0) {
      return null;
    }
    return (<Button theme={ logicalButtonTheme } className="u-margin-top-md" onClick={ this.toggleLogicalOperator }>{ t(`segments.operators.${ logicalOperator }`) }</Button>);
  }

  renderFilterTypeDropdown() {
    const { selectedFilterName, t, filterGroupId } = this.props;
    const source = AVAILABLE_FILTERS[filterGroupId].map((f) => ({
      value: f,
      label: t(`segments.filters.${ f }`)
    }));
    return (<Dropdown source={ source } onChange={ this.props.updateSelectedFilter } value={ selectedFilterName } />);
  }

  renderOperator() {
    const { selectedFilterName, selectedOperator, t } = this.props;
    const source = OPERATOR_SETS[FILTER_VALUE_TYPE[selectedFilterName]].map((o) => ({
      value: o,
      label: t(`segments.operators.${ o }`)
    }));
    return (<Dropdown source={ source } onChange={ this.props.updateSelectedOperator } value={ selectedOperator } />);
  }

  renderValue() {
    const { selectedValue } = this.props;
    return (<Input type="text" value={ selectedValue } onChange={ this.props.updateSelectedValue } />);
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-3 col-xs-6 text-right">
          { this.renderJoinType() }
        </div>
        <div className="col-sm-3 col-xs-6">
          { this.renderFilterTypeDropdown() }
        </div>
        <div className="col-sm-2 col-xs-4">
          { this.renderOperator() }
        </div>
        <div className="col-sm-3 col-xs-6">
          { this.renderValue() }
        </div>
        <div className="col-sm-1 col-xs-2">
          <IconButton icon="close" className="u-margin-top-md" onClick={ this.props.removeFilteritem } />
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { currentSegment } }, { filterGroupId, filterItemIndex }) => ({
  selectedFilterName: currentSegment.filter[filterGroupId][filterItemIndex].filterName,
  selectedOperator: currentSegment.filter[filterGroupId][filterItemIndex].operator,
  selectedValue: currentSegment.filter[filterGroupId][filterItemIndex].value,
  logicalOperator: currentSegment.filter[filterGroupId][filterItemIndex].logicalOperator
});

const mapDispatchToProps = (dispatch, { filterGroupId, filterItemIndex }) => ({
  updateSelectedLogicalOperator: (...args) => dispatch(updateSelectedLogicalOperator(filterGroupId, filterItemIndex, ...args)),
  updateSelectedFilter: (...args) => dispatch(updateSelectedFilter(filterGroupId, filterItemIndex, ...args)),
  updateSelectedOperator: (...args) => dispatch(updateSelectedOperator(filterGroupId, filterItemIndex, ...args)),
  updateSelectedValue: (...args) => dispatch(updateSelectedValue(filterGroupId, filterItemIndex, ...args)),
  removeFilteritem: () => dispatch(removeFilteritem(filterGroupId, filterItemIndex))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(SegmentFilterItem)
);
