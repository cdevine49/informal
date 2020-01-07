import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Form, Input, SubmitButton } from './';

beforeEach(() => {
  console.error = jest.fn();
});

test('should be able to submit with valid form values unless form is currently being submitted', async () => {
  const submissionPromise = new Promise(resolve => resolve());
  const onSubmit = jest.fn(() => Promise.resolve(submissionPromise));
  const rendered = render(
    <Form initialValues={{ age: '', name: '' }} onSubmit={onSubmit}>
      <Input label="Name" name="name" type="text" />
      <Input label="Age" name="age" type="number" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );

  const nameInput = rendered.getByLabelText('Name');

  fireEvent.change(nameInput, { target: { value: 'Jack' } });

  const ageInput = rendered.getByLabelText('Age');

  fireEvent.change(ageInput, { target: { value: 81 } });

  const submitButton = rendered.getByText('Submit');
  fireEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({ age: '81', name: 'Jack' });
  expect(submitButton).toHaveAttribute('disabled');

  fireEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledTimes(1);

  await submissionPromise;

  expect(submitButton).not.toHaveAttribute('disabled');

  fireEvent.change(ageInput, { target: { value: 82 } });
  fireEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledTimes(2);
  expect(onSubmit).toHaveBeenCalledWith({ age: '82', name: 'Jack' });
});
