'use client';

import { InputValidation } from '@@/types';
import { Form } from 'radix-ui';
import { useEffect, useState } from 'react';
import FormWrapper from '@/components/forms/FormWrapper';

interface InputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  type: 'email' | 'number' | 'text' | 'hidden';

  // For length
  minLen?: number;
  maxLen?: number;

  // For numbers
  min?: number;
  max?: number;
  step?: string;

  // Formatting
  hasValidation?: boolean;
  hasMessages?: boolean;
  customStyles?: string;
  customOnChange?: React.ChangeEventHandler<HTMLElement>;
}

export const FormInput = ({
  name,
  label,
  placeholder,
  required = false,
  value = '',
  type,
  minLen,
  maxLen,
  min,
  max,
  step = 'any',
  hasValidation = true,
  hasMessages = true,
  customStyles = '',
  customOnChange = undefined,
}: InputProps) => {
  const [val, setVal] = useState(value ?? '');

  useEffect(() => {
    setVal(value as string);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVal(event.target.value);

    if (customOnChange !== undefined) customOnChange(event);
  };

  if (type == 'hidden') {
    return (
      <Form.Field name={name} className="!hidden">
        <Form.Control asChild>
          <input type={type} onChange={handleChange} value={val} />
        </Form.Control>
      </Form.Field>
    );
  }

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
    } else if (type === 'text') {
      validations.push({
        validation: 'valueMissing',
        message: hasMessages ? 'Enter text' : '',
      });
      if (minLen !== undefined) {
        validations.push({
          validation: 'tooShort',
          message: hasMessages ? 'Provide longer text' : '',
        });
      }
      if (maxLen !== undefined) {
        validations.push({
          validation: 'tooLong',
          message: hasMessages ? 'Provide shorter text' : '',
        });
      }
    }
  }

  return (
    <FormWrapper
      name={name}
      label={label}
      validations={validations}
    >
      <input
        className={`form-input ${customStyles}`}
        type={type}
        placeholder={placeholder}
        required={required}
        value={val}
        minLength={minLen}
        maxLength={maxLen}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    </FormWrapper>
  );
};
