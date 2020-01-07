import React from 'react';
import { FormContext } from './form';

export const Input = ({ id, label, name }) => {
  const {
    onChange,
    values: { [name]: value }
  } = React.useContext(FormContext);
  return (
    <React.Fragment>
      <label htmlFor={id || name}>{label}</label>
      <input id={id || name} name={name} onChange={onChange} value={value} />
    </React.Fragment>
  );
};
