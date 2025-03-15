import { Form } from 'radix-ui';

const FormInput = () => {
  return (
    <Form.Field className="w-px-300" name="email">
      <div className="flex items-baseline justify-between mb-1">
        <Form.Label className="text-sm font-semibold">Email</Form.Label>
        <Form.Message
          className="form-message"
          match="valueMissing"
        >
          Please enter your email
        </Form.Message>
        <Form.Message
          className="form-message"
          match="typeMismatch"
        >
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="form-input"
          type="email"
          placeholder='Enter email...'
          required
        />
      </Form.Control>
    </Form.Field>
  );
};

export default FormInput;
