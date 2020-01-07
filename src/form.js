import React from 'react';

export const FormContext = React.createContext({});
export const Form = ({ initialValues = {}, ...props }) => {
  const [values, setValues] = React.useState(initialValues);

  const onChange = e => {
    const newValues = { [e.target.name]: e.target.value };
    setValues(previousValues => ({
      ...previousValues,
      ...newValues
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(values);
  };

  return (
    <FormContext.Provider value={{ onChange, values }}>
      <form {...props} onSubmit={handleSubmit} />
    </FormContext.Provider>
  );
};
