'use client';

import { Switch } from 'radix-ui';
import FormWrapper from '@/components/forms/FormWrapper';
import { useState } from 'react';

// Make id a variable add label and such next
interface FormSwitchProps {
  name: string;
  label?: string;
  isChecked?: boolean;
}

const FormSwitch = ({ name, label, isChecked }: FormSwitchProps) => {
  const [checked, setChecked] = useState(isChecked);
  
  return (
    <FormWrapper name={name} label={label} validations={[]} customStyles="w-75">
      <Switch.Root
        className="switch-root"
        checked={checked}
        onCheckedChange={setChecked}
      >
        <Switch.Thumb className="switch-thumb" />
      </Switch.Root>
    </FormWrapper>
  );
};

export default FormSwitch;
