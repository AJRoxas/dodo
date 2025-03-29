import { Form, Switch } from 'radix-ui';

// Make id a variable add label and such next
interface FormSwitchProps {
  name: string;
  label?: string;
}

const FormSwitch = ({ name, label }: FormSwitchProps) => {
  return (
    <Form.Field name={name} className="flex justify-between items-center w-75">
      <div className="flex items-baseline justify-between">
        {label ? (
          <Form.Label className="text-sm font-semibold">{label}</Form.Label>
        ) : undefined}
      </div>
      <Form.Control asChild>
        <Switch.Root className="switch-root" id={name}>
          <Switch.Thumb className="switch-thumb" />
        </Switch.Root>
      </Form.Control>
    </Form.Field>
  );
};

export default FormSwitch;
