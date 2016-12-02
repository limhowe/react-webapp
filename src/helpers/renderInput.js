/* eslint-disable */
import React from 'react';
import { Input } from 'react-toolbox';

const renderInput = ({ input, label, meta: { touched, error }, ...custom }) => (
  <Input label={ label } { ...input } { ...custom } error={ touched && error ? error : '' } />
);

export default renderInput;
