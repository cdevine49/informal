import React from 'react';

export const FormContext = React.createContext({});
export const Form = ({ initialValues = {}, ...props }) => {
  const [errors, setErrors] = React.useState({});
  const [values, setValues] = React.useState(initialValues);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    await props.onSubmit(values);
    setIsSubmitting(false);
  };

  return (
    <FormContext.Provider
      value={{ errors, isSubmitting, setErrors, setValues, values }}
    >
      <form {...props} onSubmit={handleSubmit} />
    </FormContext.Provider>
  );
};
