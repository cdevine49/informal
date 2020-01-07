import React from 'react';
import { FormContext } from './form';

export const SubmitButton = props => {
  const disabled = React.useContext(FormContext).isSubmitting;
  return <button disabled={disabled} type="submit" {...props} />;
};
