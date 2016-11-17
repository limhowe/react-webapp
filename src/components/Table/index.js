import React, { Component } from 'react';
import { Table, ProgressBar } from 'react-toolbox';

export default class CustomTable extends Component {
  displayName: 'Table'
  state = {
    loading: false,
    source: []
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({ loading: nextProps.loading });
    }

    if (nextProps.source) {
      this.setState({
        source: nextProps.source
      });
    }
  }

  props: {
    loading: bool,
    model: {
      [key: string]: Object
    }
  }

  render() {
    // @TODO implement sort, pagination.
    const { model, ...props } = this.props;
    const { source, loading } = this.state;
    return (
      <div>
        <Table { ...props } model={ model } source={ source } />
        { loading ? <ProgressBar className="u-display-block" mode="indeterminate" multicolor /> : null }
      </div>
    );
  }
}
