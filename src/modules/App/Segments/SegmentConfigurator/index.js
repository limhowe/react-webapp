import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Input, Button, FontIcon } from 'react-toolbox';

import { updateName, saveSegment } from '../redux/actions';
import { formattedFilter } from '../redux/selector';
import SegmentFilter from './SegmentFilter';
import AudienceCountChart from './AudienceCountChart';

// @TODO implement favorite

export class SegmentConfigurator extends Component {
  displayName: 'SegmentConfigurator'
  props: {
    updateName: Function,
    saveSegment: Function,
    saving: bool,
    readyFilter: Object,
    onCancel: Function,
    previewCount: Object,
    currentSegment: Object
  }

  save = () => {
    const { currentSegment, readyFilter } = this.props;
    this.props.saveSegment(currentSegment.id, {
      name: currentSegment.name,
      filter: readyFilter
    });
  }

  render() {
    const { currentSegment, saving, onCancel } = this.props;
    return (
      <div className="c-segment-configurator">
        <div className="c-segment-configurator-heading">
          <div className="row">
            <div className="col-sm-12">
              <h3><FontIcon value="tune" className="c-icon" /> Custom Segment Configurator</h3>
            </div>
          </div>
        </div>
        <div className="c-segment-configurator-body">
          <div className="row c-segment-basic-info">
            <div className="col-sm-6">
              <Input type="text" label="Segment Name" onChange={ this.props.updateName } value={ currentSegment.name } />
            </div>
            <div className="col-sm-3 text-right">
              <small>
                Estimated <br />
                Number of Users <br />
              </small>
              <span className="c-segment-preview-count">{ `${ this.props.previewCount.count }` }</span>
            </div>
            <div className="col-sm-3">
              <AudienceCountChart />
            </div>
          </div>
          <SegmentFilter />
          <div className="row">
            <div className="col-sm-12">
              {/* <Button icon="star" raised /> &nbsp; */}
              <Button primary raised disabled={ !currentSegment.name || saving } onClick={ this.save }>
                { saving ? 'Saving...' : 'Save' }
              </Button>&nbsp;
              { onCancel ? <Button raised onClick={ onCancel } label="Cancel" /> : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  const { segments: { currentSegment, previewCount, saving } } = state;
  return {
    readyFilter: formattedFilter(state),
    currentSegment,
    previewCount,
    saving
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateName: (...args) => dispatch(updateName(...args)),
  saveSegment: (...args) => dispatch(saveSegment(...args))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(SegmentConfigurator)
);
