import React, { Component } from 'react';
import { Table, ProgressBar, Input } from 'react-toolbox';
import _ from 'lodash';
import theme from './styles.scss';

export default class CustomTable extends Component {
  displayName: 'Table'

  constructor(props) {
    super(props);
    this.state = {
      loading: props.loading,
      filter: '',
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

  filterChange = (filter) => {
    this.setState({ filter });
  }

  render() {
    // @TODO implement sort, pagination.
    const { model, ...props } = this.props;
    const { source, loading, filter } = this.state;

    const filteredSource = source.filter((item) => {
      if (!filter) {
        return true;
      }

      let result = false;
      Object.keys(item).forEach((key) => {
        if (typeof item[key] === 'string' && item[key].toLowerCase().indexOf(filter.toLowerCase()) > -1) {
          result = true;
        }
      });
      return result;
    });

    return (
      <div className={ theme.tableWrapper }>
        <div className={ theme.filterWrapper }>
          <div className={ theme.filterInput }>
            <Input type="text" label="Filter" value={ filter } onChange={ this.filterChange } />
          </div>
        </div>
        <Table { ...props } model={ model } source={ filteredSource } theme={ theme } />
        { loading ? <ProgressBar className="u-display-block" mode="indeterminate" multicolor /> : null }
      </div>
    );
  }
}
