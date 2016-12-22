import { createSelector } from 'reselect';
export const getFormErrors = (state) => state.superdashboard.formErrors;

export const hasErrors = createSelector([getFormErrors], (errors) => {
  let hasError = false;
  Object.keys(errors).forEach((key) => {
    if (errors[key]) {
      hasError = true;
    }
  });
  return hasError;
});
