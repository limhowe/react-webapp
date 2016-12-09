import React, { Component } from 'react';
import { Table, ProgressBar } from 'react-toolbox';
import theme from './styles.scss';

export default class CustomTable extends Component {
  displayName: 'Table'

  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      source: props.source
    };
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
    source: Array<Object>,
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
        <Table { ...props } model={ model } source={ source } theme={ theme } />
        { loading ? <ProgressBar className="u-display-block" mode="indeterminate" multicolor /> : null }
      </div>
    );
  }
}
