import React, { Component } from 'react';

import { Form, Input, SubmitButton } from 'informal';

export default class App extends Component {
  render() {
    return (
      <div>
        <Form
          initialValues={{ age: '', name: '' }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          <Input label="Name" name="name" required type="text" />
          <Input label="Age" name="age" type="number" />
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </div>
    );
  }
}
