import React from 'react';

export const Input = ({ id, label }) => (
  <React.Fragment>
    <label htmlFor={id}>{label}</label>
    <input id={id} />
  </React.Fragment>
);
