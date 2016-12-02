import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { push } from 'react-router-redux';
import { IconButton } from 'react-toolbox';

import Table from '../../../../components/Table';

export class SegmentTable extends Component {
  displayName: 'SegmentTable'

  props: {
    loading: bool,
    displayList: Array<Object>,
    editSegment: Function
  }

  render() {
    const { displayList, editSegment, loading } = this.props;
    const segmentMapped = displayList.map((s) => ({
      ...s,
      actions: (
        <span>
          <IconButton icon="edit" onClick={ () => editSegment(s._id) } />
        </span>
      )
    }));

    const model = {
      name: { title: 'Name' },
      count: { title: 'Targeted Audiences' },
      actions: { title: 'Actions' }
    };

    return (
      <div>
        <Table model={ model } source={ segmentMapped } loading={ loading } selectable={ false } />
      </div>
    );
  }
}

const mapStatesToProps = ({ segments: { displayList, listLoading } }) => ({
  displayList,
  loading: listLoading
});

const mapDispatchToProps = (dispatch) => ({
  editSegment: (segmentId) => dispatch(push(`/app/audience/${ segmentId }`))
});

export default translate()(
  connect(mapStatesToProps, mapDispatchToProps)(SegmentTable)
);
