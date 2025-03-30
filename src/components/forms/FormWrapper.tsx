import { InputValidation } from "@@/types";
import { Form } from "radix-ui";

interface FormInputWrapperProps {
  name: string;
  label?: string;
  type?: string;
  children: React.ReactNode;
  validations: InputValidation[];
  customStyles?: string;
}

const FormWrapper = ({
  name,
  label,
  type = 'input',
  children,
  validations = [],
  customStyles,
}: FormInputWrapperProps) => (
  <Form.Field name={name} className={customStyles}>
    <div className="flex items-baseline justify-between">
      {label ? (
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
    <Form.Control type={type} asChild>{children}</Form.Control>
  </Form.Field>
);

export default FormWrapper;