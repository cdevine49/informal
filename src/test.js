import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Form, Input, SubmitButton } from './';

test('should be able to submit with valid form values', () => {
  const onSubmit = jest.fn();
  const rendered = render(
    <Form onSubmit={onSubmit}>
      <Input label="Name" name="name" type="text" />
      <Input label="Age" name="age" type="number" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );

  const nameInput = rendered.getByLabelText('Name');

  fireEvent.change(nameInput, { target: { value: 'Jack' } });

  const ageInput = rendered.getByLabelText('Name');

  fireEvent.change(ageInput, { target: { value: 81 } });

  fireEvent.click(rendered.getByText('Submit'));

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({ age: 81, name: 'Jack' });
});
