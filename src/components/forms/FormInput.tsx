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

  // Formatting
  hasValidation?: boolean;
  hasMessages?: boolean;
  hasLabel?: boolean;
  customStyles?: string;
  customOnChange?: React.ChangeEventHandler<HTMLElement>;
}

interface FormInputWrapperProps {
  name: string;
  label: string;
  children: React.ReactNode;
  validations: InputValidation[];

  hasLabel: boolean;
}

const FormInputWrapper = ({
  name,
  label,
  children,
  validations = [],
  hasLabel,
}: FormInputWrapperProps) => (
  <Form.Field name={name}>
    <div className="flex items-baseline justify-between">
      {hasLabel ? (
        <Form.Label className="text-sm font-semibold">{label}</Form.Label>
      ) : undefined}
      {validations.map(({ validation, message }) => (
        <Form.Message
          key={validation}
          className="form-message"
          match={validation}
        >
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
  hasValidation = true,
  hasMessages = true,
  hasLabel = true,
  customStyles = '',
  customOnChange = undefined,
}: InputProps) => {
  const [val, setVal] = useState(value ?? '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);
  };

  const validations: InputValidation[] = [];

  if (hasValidation) {
    if (type === 'email') {
      validations.push(
        {
          validation: 'valueMissing',
          message: hasMessages ? 'Enter your email' : '',
        },
        {
          validation: 'typeMismatch',
          message: hasMessages ? 'Provide a valid email' : '',
        }
      );
    } else if (type === 'number') {
      validations.push({
        validation: 'valueMissing',
        message: hasMessages ? 'Enter a number' : '',
      });
      if (min !== undefined) {
        validations.push({
          validation: 'rangeUnderflow',
          message: hasMessages ? 'Provide a higher number' : '',
        });
      }
      if (max !== undefined) {
        validations.push({
          validation: 'rangeOverflow',
          message: hasMessages ? 'Provide a lower number' : '',
        });
      }
    }
  }

  return (
    <FormInputWrapper
      name={name}
      label={label}
      validations={validations}
      hasLabel={hasLabel}
    >
      <input
        className={`form-input ${customStyles}`}
        type={type}
        placeholder={placeholder}
        required={required}
        value={val}
        min={min}
        max={max}
        step={step}
        onChange={
          customOnChange === undefined
            ? handleChange
            : (e) => {
                handleChange(e);
                customOnChange(e);
              }
        }
      />
    </FormInputWrapper>
  );
};
