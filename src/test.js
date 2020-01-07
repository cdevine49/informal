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

test('should disable submit button while any inputs invalid', () => {
  const onSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <Form initialValues={{ email: '', password: 'Abc' }} onSubmit={onSubmit}>
      <Input label="Email" name="email" required type="email" />
      <Input label="Password" lowercase name="password" type="password" />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  );

  const submitButton = getByText('Submit');

  expect(submitButton).toHaveAttribute('disabled');

  fireEvent.change(getByLabelText('Email'), { target: { value: 'a@a.io' } });

  expect(submitButton).toHaveAttribute('disabled');

  fireEvent.change(getByLabelText('Password'), { target: { value: 'abc' } });

  expect(submitButton).not.toHaveAttribute('disabled');
});

test('should only show errors on blur and on change after blurred for first time with delay if currently valid', () => {
  const { getByLabelText, queryByText } = render(
    <Form initialValues={{ age: '', name: '' }}>
      <Input label="Email" name="email" required type="email" />
    </Form>
  );

  expect(queryByText('Email is required')).toBeNull();

  const emailInput = getByLabelText('Email');
  fireEvent.focus(emailInput);

  expect(queryByText('Email is required')).toBeNull();

  fireEvent.blur(emailInput);

  expect(queryByText('Email is required')).toBeTruthy();

  fireEvent.change(emailInput, { target: { value: 'abc' } });

  expect(queryByText('Email is required')).toBeNull();

  fireEvent.change(emailInput, { target: { value: '' } });

  expect(queryByText('Email is required')).toBeTruthy();
});

describe('Validations', () => {
  const blur = input => {
    fireEvent.focus(input);
    fireEvent.blur(input);
  };

  test('should show error if field marked `required` is empty and add the `required` attribute to the input', () => {
    const { getByLabelText, queryByText } = render(
      <Form initialValues={{ age: '', name: '' }}>
        <Input label="Username" name="username" required type="text" />
      </Form>
    );

    const input = getByLabelText('Username');

    expect(input).toHaveAttribute('required');
    expect(queryByText('Username is required')).toBeNull();

    blur(input);

    expect(queryByText('Username is required')).toBeTruthy();
  });
});
