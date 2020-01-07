import React from 'react';
import { FormContext } from './form';

export const Input = ({ id, label, lowercase, name, ...props }) => {
  const [blurred, setBlurred] = React.useState(false);
  const { errors, setErrors, setValues, values } = React.useContext(
    FormContext
  );

  const value = values[name];

  React.useEffect(() => {
    const errors = [];
    if (props.required) {
      if (!value) {
        errors.push(`${label} is required`);
      }
    }

    if (lowercase) {
      if (value !== value.toLowerCase()) {
        errors.push(`${label} must be lowercase`);
      }
    }

    setErrors(previousErrors => ({
      ...previousErrors,
      [name]: errors
    }));
  }, [value]);

  const onChange = e => {
    const newValues = { [e.target.name]: e.target.value };
    setValues(previousValues => ({
      ...previousValues,
      ...newValues
    }));
  };

  return (
    <React.Fragment>
      <label htmlFor={id || name}>{label}</label>
      <input
        {...props}
        id={id || name}
        name={name}
        onChange={onChange}
        onBlur={() => setBlurred(true)}
        value={value}
      />
      {blurred && errors[name] && errors[name].length > 0 && (
        <span className="error-message">{errors[name][0]}</span>
      )}
    </React.Fragment>
  );
};
