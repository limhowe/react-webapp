import React, { Component } from 'react';
import { Button } from 'react-toolbox';

import styles from './ButtonGroup.scss';

export default class ButtonGroup extends Component {
  displayName: 'ButtonGroup'
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  props: {
    source: Array<Object>,
    onChange: Function,
    className: string,
    value: string
  }

  onChange = (value) => {
    this.props.onChange(value);
  }

  renderButtons() {
    return this.props.source.map((props) => {
      const { label, icon, value } = props;
      return (
        <Button
          theme={ styles }
          icon={ icon }
          label={ label }
          key={ value }
          onClick={ () => this.onChange(value) }
          raised={ this.state.value !== value }
        />
      );
    });
  }

  render() {
    return (
      <div className={ this.props.className }>
        { this.renderButtons() }
      </div>
    );
  }
}
