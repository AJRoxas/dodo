import { InputValidation } from '@@/types';
import { Form } from 'radix-ui';
import { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  required: boolean;
}

interface FormInputProps extends InputProps {
  validations: InputValidation[];
}

const FormInput = ({
  name,
  label,
  type,
  placeholder = undefined,
  required = false,
  validations = [],
}: FormInputProps) => {
  return (
    <Form.Field className="w-px-300" name={name}>
      <div className="flex items-baseline justify-between mb-1">
        <Form.Label className="text-sm font-semibold">{label}</Form.Label>
        {validations.map(({ validation, message }) => {
          return (
            <Form.Message
              key={validation}
              className="form-message"
              match={validation}
            >
              {message}
            </Form.Message>
          );
        })}
      </div>
      <Form.Control asChild>
        <input
          className="form-input"
          type={type}
          placeholder={placeholder}
          required={required}
        />
      </Form.Control>
    </Form.Field>
  );
};

export const FormEmail = ({
  name,
  label,
  type,
  placeholder = undefined,
  required = false,
}: InputProps) => {
  const validations: InputValidation[] = [
    {
      validation: 'valueMissing',
      message: 'Please enter your email',
    },
    {
      validation: 'typeMismatch',
      message: 'Please provide a valid email',
    },
  ];
  return (
    <FormInput
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      required={required}
      validations={validations}
    ></FormInput>
  );
};

export default FormInput;
