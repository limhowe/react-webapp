import { createAction } from 'redux-actions';
import { push } from 'react-router-redux';
import AuthService from '../../../../api-services/AuthService';

// signin
export const AUTH_SIGNIN_REQUEST = 'auth/signin/request';
export const AUTH_SIGNIN_SUCCESS = 'auth/signin/succes';
export const AUTH_SIGNIN_ERROR = 'auth/signin/error';

export const authSigninRequest = createAction(AUTH_SIGNIN_REQUEST, (authData) => {
  return (dispatch, getState) => {
    const authService = new AuthService(dispatch, getState());
    authService.signin(authData, {
      SUCCESS: AUTH_SIGNIN_SUCCESS,
      ERROR: AUTH_SIGNIN_ERROR
    }).then(() => {
      dispatch(push('/app/home'));
    });
  };
});

// signout
export const AUTH_SIGNOUT_REQUEST = 'auth/signout/request';
export const AUTH_SIGNOUT_SUCCESS = 'auth/signout/succes';

export const authSignoutRequest = createAction(AUTH_SIGNOUT_REQUEST, () => {
  return (dispatch) => {
    // no need for log out api call since we are using JWT
    dispatch({
      type: AUTH_SIGNOUT_SUCCESS,
      payload: null
    });
    dispatch(push('/app/auth/login'));
  };
});

export const AUTH_SIGNUP_REQUEST = 'auth/signup/request';
export const AUTH_SIGNUP_SUCCESS = 'auth/signup/succes';
export const AUTH_SIGNUP_ERROR = 'auth/signup/error';

export const authSignupRequest = createAction(AUTH_SIGNUP_REQUEST, (signupData) => {
  return (dispatch, getState) => {
    const authService = new AuthService(dispatch, getState());
    return authService.signup(signupData, {
      SUCCESS: AUTH_SIGNUP_SUCCESS,
      ERROR: AUTH_SIGNUP_ERROR
    }).then(() => {
      dispatch(push(`/app/auth/signup/success?email=${ signupData.email }`));
    });
  };
});

export const AUTH_RESEND_EMAIL_REQUEST = 'auth/resend-confirm/request';
export const resendConfirmEmailRequest = createAction(AUTH_RESEND_EMAIL_REQUEST, (email) => {
  return (dispatch, getState) => {
    const authService = new AuthService(dispatch, getState());
    return authService.resendConfirmEmail(email, {}, {
      successMessage: 'Account verification mail has been sent.'
    });
  };
});

export const AUTH_VERIFY_ACCOUNT_REQUEST = 'auth/verify-account/request';
export const verifyAccountRequest = createAction(AUTH_VERIFY_ACCOUNT_REQUEST, (params) => {
  return (dispatch, getState) => {
    const authService = new AuthService(dispatch, getState());
    return authService.verifyAccount(params, {}, { successMessage: 'Your account has been activated' }).then(() => {
      dispatch(push('/app/auth/login'));
    }).catch(() => {
      dispatch(push('/app/auth/login'));
    });
  };
});
