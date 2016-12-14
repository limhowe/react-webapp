import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ProgressBar } from 'react-toolbox';
import { Pie, PieChart, Cell, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

import styles from './styles.scss';
import { getUserDataRequest } from '../redux/actions';
const colors = ['#60c0ec', '#32c5d2', '#f8cb00'];

export class UserChart extends Component {
  displayName: 'UserChart';

  componentWillMount() {
    this.props.getUserData();
  }

  props: {
    getUserData: Function,
    userData: Array<Object>,
    userDataLoading: bool
  }

  render() {
    const { userData } = this.props;
    const total = _.sumBy(userData, 'value');

    if (userData.length < 3) {
      return (
        <div className={ styles.userChart }>
          <h3>Users</h3>
          <div className="c-container__center">
            <ProgressBar mode="indeterminate" type="circular" />
          </div>
        </div>
      );
    }

    return (
      <div className={ styles.userChart }>
        <h3>Users</h3>
        <div className={ styles.chartContainer }>
          <div className={ styles.chartDetail }>
            <div className={ styles.chartDetailItem }>
              <span className={ styles.value } style={ { color: colors[0] } }>{ `${ Math.round(userData[0].value * 100 / (total || 1)) }%` }</span>
              <span className={ styles.label }>{ userData[0].name }</span>
            </div>
            <div className={ styles.chartDetailItem }>
              <span className={ styles.value } style={ { color: colors[1] } }>{ `${ Math.round(userData[1].value * 100 / (total || 1)) }%` }</span>
              <span className={ styles.label }>{ userData[1].name }</span>
            </div>
            <div className={ styles.chartDetailItem }>
              <span className={ styles.value } style={ { color: colors[2] } }>{ `${ Math.round(userData[2].value * 100 / (total || 1)) }%`}</span>
              <span className={ styles.label }>{ userData[2].name }</span>
            </div>
          </div>
          <div>
            <PieChart width={ 300 } height={ 300 }>
              <Pie data={ userData } cx={ 150 } cy={ 130 } innerRadius={ 60 } outerRadius={ 100 } paddingAngle={ 3 } fill={ colors[0] } label>
                <Cell fill={ colors[0] } />
                <Cell fill={ colors[1] } />
                <Cell fill={ colors[2] } />
              </Pie>
              <Tooltip />
              <g>
                <text x={ 150 } y={ 130 } dy={ 8 } textAnchor="middle" className={ styles.totalUsersValue }>{ `${ total }` }</text>
                <text x={ 150 } y={ 130 } dy={ 20 } textAnchor="middle" className={ styles.totalUsersLabel }>Total Users</text>
              </g>
            </PieChart>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatesToProps = ({ dashboard: { userData, userDataLoading } }) => ({
  userData,
  userDataLoading
});

const mapDispatchToProps = (dispatch) => ({
  getUserData: (...args) => dispatch(getUserDataRequest(...args))
});

export default connect(mapStatesToProps, mapDispatchToProps)(UserChart);
