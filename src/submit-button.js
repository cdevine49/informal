import React from 'react';
import { FormContext } from './form';

export const SubmitButton = props => {
  const { errors, isSubmitting } = React.useContext(FormContext);
  const disabled =
    isSubmitting ||
    Object.values(errors).filter(fieldErrors => fieldErrors.length).length > 0;
  return <button disabled={disabled} type="submit" {...props} />;
};
