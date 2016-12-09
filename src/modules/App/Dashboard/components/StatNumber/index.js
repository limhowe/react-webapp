import React, { Component } from 'react';
import CountUp from 'react-countup';
import cn from 'classnames';
import styles from './styles.scss';

export class StatNumber extends Component {
  displayName: 'StatNumber';

  componentWillMount() {
    this.setState({ value: this.props.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  props: {
    color: string,
    label: string,
    value: number,
    decimals?: number,
    suffix?: string
  }

  render() {
    const { label, suffix, color, decimals } = this.props;
    const className = cn(styles[color], styles.statNumber);
    return (
      <div className={ className }>
        <h4>{ label }</h4>
        <CountUp className={ styles.counter } start={ 0 } end={ this.state.value || 0 } suffix={ suffix } decimals={ decimals || 0 } />
      </div>
    );
  }
}

export default StatNumber;
