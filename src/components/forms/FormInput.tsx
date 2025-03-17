'use client';

import { InputValidation } from '@@/types';
import { Form } from 'radix-ui';
import { useState } from 'react';

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  required: boolean;
  value?: string | number;
  type: 'email' | 'number';

  // For numbers
  min?: number;
  max?: number;
  step?: string;
}

const FormInputWrapper = ({
  name,
  label,
  children,
  validations = [],
}: {
  name: string;
  label: string;
  children: React.ReactNode;
  validations: InputValidation[];
}) => (
  <Form.Field className="w-px-300" name={name}>
    <div className="flex items-baseline justify-between mb-1">
      <Form.Label className="text-sm font-semibold">{label}</Form.Label>
      {validations.map(({ validation, message }) => (
        <Form.Message key={validation} className="form-message" match={validation}>
          {message}
        </Form.Message>
      ))}
    </div>
    <Form.Control asChild>{children}</Form.Control>
  </Form.Field>
);

export const FormInput = ({
  name,
  label,
  placeholder,
  required = false,
  value,
  type,
  min,
  max,
  step = 'any',
}: InputProps) => {
  const [val, setVal] = useState(value ?? '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
  };

  const validations: InputValidation[] = [];

  if (type === 'email') {
    validations.push(
      { validation: 'valueMissing', message: 'Enter your email' },
      { validation: 'typeMismatch', message: 'Provide a valid email' }
    );
  } else if (type === 'number') {
    validations.push(
      { validation: 'valueMissing', message: 'Enter a number' }
    )
    if (min !== undefined) {
      validations.push({ validation: 'rangeUnderflow', message: 'Provide a higher number' });
    }
    if (max !== undefined) {
      validations.push({ validation: 'rangeOverflow', message: 'Provide a lower number' });
    }
  }

  return (
    <FormInputWrapper name={name} label={label} validations={validations}>
      <input
        className="form-input"
        type={type}
        placeholder={placeholder}
        required={required}
        value={val}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    </FormInputWrapper>
  );
};
