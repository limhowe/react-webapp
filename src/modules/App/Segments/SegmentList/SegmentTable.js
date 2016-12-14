import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { IconButton, Dialog } from 'react-toolbox';
import _ from 'lodash';

import Table from '../../../../components/Table';
import { getAudienceCount } from '../../Analytics/redux/actions';
import { fullSegmentList } from '../redux/selector';
import { segmentDeleteRequest } from '../redux/actions';

export class SegmentTable extends Component {
  displayName: 'SegmentTable'
  state = {
    dialogActive: false
  }

  componentWillReceiveProps(nextProps) {
    // load count only on first load
    if (!nextProps.loading && nextProps.loading !== this.props.loading) {
      this.props.getAudienceCount(nextProps.displayList.map((d) => d._id));
    }
  }

  toggleDialog = () => this.setState({ dialogActive: !this.state.dialogActive })

  openDeleteDialog = (segmentId) =>
    () => {
      this.segmentId = segmentId;
      this.toggleDialog();
    }

  deleteSegment = () => {
    this.props.segmentDeleteRequest(this.segmentId);
    this.toggleDialog();
  }

  actions = [
    { label: 'Cancel', onClick: this.toggleDialog },
    { label: 'Delete', onClick: this.deleteSegment }
  ];

  props: {
    loading: bool,
    displayList: Array<Object>,
    segments: Array<Object>,
    getAudienceCount: Function,
    editSegment: Function,
    segmentDeleteRequest: Function,
    filter: Object
  }

  render() {
    const { segments, editSegment, loading, filter } = this.props;
    const segmentMapped = _.filter(segments.map((s) => ({
      ...s,
      actions: (
        <span>
          <IconButton primary icon="edit" onClick={ () => editSegment(s._id) } />
          <IconButton primary icon="delete" onClick={ this.openDeleteDialog(s._id) } />
        </span>
      ),
      campaigns: (
        <span>
          {
            s.campaigns.map((c) => (
              <span key={ `${ c._id }_${ s._id }` }>{ `${ c.title } (${ c.status })` }<br /></span>
            ))
          }
        </span>
      )
    })), filter);

    const model = {
      name: { title: 'Name' },
      campaigns: { title: 'Used Campaigns' },
      audienceCount: { title: 'Targeted Audiences' },
      actions: { title: 'Actions' }
    };

    return (
      <div>
        <Table model={ model } source={ segmentMapped } loading={ loading } selectable={ false } />
        <Dialog
          actions={ this.actions }
          active={ this.state.dialogActive }
          onEscKeyDown={ this.toggleDialog }
          onOverlayClick={ this.toggleDialog }
          title="Confirmation"
        >
          <p>Are you sure to delete this segment? It might affect associated campaigns.</p>
        </Dialog>
      </div>
    );
  }
}

const mapStatesToProps = (state) => {
  const { segments: { displayList, listLoading, filter }, campaign: { campaigns } } = state;
  return {
    displayList,
    campaigns,
    filter,
    loading: listLoading,
    segments: fullSegmentList(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  editSegment: (segmentId) => dispatch(push(`/app/audience/${ segmentId }`)),
  getAudienceCount: (segmentIds) => dispatch(getAudienceCount(segmentIds)),
  segmentDeleteRequest: (segmentId) => dispatch(segmentDeleteRequest(segmentId))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(SegmentTable)
);
