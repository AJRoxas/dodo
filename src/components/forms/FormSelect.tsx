'use client';

import { Form } from 'radix-ui';
import SelectDropdown from '../SelectDropdown';
import { useRef, useState } from 'react';
import { tags } from '@prisma/client';

interface FormSelectProps {
  options: tags[];
  placeholder?: string;
  selected?: string;
}

// Select does not have it's own validity state, as Radix primitives does not
// have the functionality developed.
// As such, we will use useState to deal with tit
const FormSelect = ({
  options,
  placeholder,
  selected,
}: Readonly<FormSelectProps>) => {
  const [value, setValue] = useState(selected ?? '');
  const name = 'starting_sem';


  const inputRef = useRef<HTMLInputElement>(null);
  // Ref to focus on trigger when text is invalid
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSelectChange = (value: string) => {
    if (inputRef.current) {
      inputRef.current.value = value;
      inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
    setValue(value);
  };

  const handleInvalid = (event: React.InvalidEvent<HTMLInputElement>) => {
    // Get the form element
    const form = event.currentTarget.closest('form');
    if (!form) return;

    // Find the first invalid input
    const firstInvalidElement = form.querySelector(':invalid') as HTMLElement;

    // If this input is the first invalid element, focus the SelectDropdown
    if (firstInvalidElement === inputRef.current && triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <Form.Field name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-sm font-semibold">
          Starting Semester
        </Form.Label>
        <Form.Message className="form-message" match="valueMissing">
          This is required
        </Form.Message>
      </div>
      <SelectDropdown
        selected={value}
        onChange={handleSelectChange}
        triggerRef={triggerRef}
        options={options}
        placeholder={placeholder}
      ></SelectDropdown>
      <Form.Control asChild>
        <input
          ref={inputRef}
          type="text"
          className="!hidden"
          required
          value={value}
          onInvalid={handleInvalid}
        ></input>
      </Form.Control>
    </Form.Field>
  );
};

export default FormSelect;
