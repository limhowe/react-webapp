export const validateRequired = (value) => {
  if (!value) {
    return 'required';
  }

  return false;
};

export const validateEmail = (value) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'email';
  }

  return false;
};

export const validateMaxLen = (max, value) => {
  if (value.length > max) {
    return ['maxlen', { len: max }];
  }

  return false;
};

export const validateMinLen = (min, value) => {
  if (value.length < min) {
    return ['maxlen', { len: min }];
  }

  return false;
};

export const validate = (value, rules) => {
  let error = '';
  if (!rules) {
    return '';
  }

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule === 'required') {
      error = validateRequired(value);
    } else if (rule === 'email') {
      error = validateEmail(value);
    } else if (rule.indexOf('maxlen') === 0) {
      const arr = rule.split(':');
      error = validateMaxLen(arr[1] * 1, value);
    } else if (rule.indexOf('minlen') === 0) {
      const arr = rule.split(':');
      error = validateMinLen(arr[1] * 1, value);
    }

    if (error) {
      return error;
    }
  }

  return error;
};

export default {
  validate,
  required: validateRequired,
  email: validateEmail,
  maxlen: validateMaxLen,
  minlen: validateMinLen
};
