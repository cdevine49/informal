import React from 'react';

export const FormContext = React.createContext({});
export const Form = ({ initialValues = {}, ...props }) => {
  const [values, setValues] = React.useState(initialValues);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onChange = e => {
    const newValues = { [e.target.name]: e.target.value };
    setValues(previousValues => ({
      ...previousValues,
      ...newValues
    }));
  };

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
    <FormContext.Provider value={{ isSubmitting, onChange, values }}>
      <form {...props} onSubmit={handleSubmit} />
    </FormContext.Provider>
  );
};
