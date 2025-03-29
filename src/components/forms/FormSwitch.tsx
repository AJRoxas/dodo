import { Switch } from 'radix-ui';
import FormWrapper from '@/components/forms/FormWrapper';

// Make id a variable add label and such next
interface FormSwitchProps {
  name: string;
  label?: string;
}

const FormSwitch = ({ name, label }: FormSwitchProps) => {
  return (
    <FormWrapper name={name} label={label} validations={[]} customStyles="w-75">
      <Switch.Root className="switch-root">
        <Switch.Thumb className="switch-thumb" />
      </Switch.Root>
    </FormWrapper>
  );
};

export default FormSwitch;
