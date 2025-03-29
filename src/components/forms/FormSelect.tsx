'use client';

import { Form } from 'radix-ui';
import { useState } from 'react';

// Not working, need to consider adding the radix select component
const FormSelect = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target)
    setValue(event.target.value);

    // if (customOnChange !== undefined) customOnChange(event);
  };

  return (
    <Form.Field name="cars">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-sm font-semibold">
          Starting Semester
        </Form.Label>
      </div>
      <Form.Control asChild>
        <select value={value} className="form-input" onChange={handleChange}>
          <option value="" disabled>
            Choose a semester...
          </option>
          <option value="1">Fall</option>
          <option value="2">Winter</option>
          <option value="3">Summer</option>
          <option value="4">Spring</option>
        </select>
      </Form.Control>
    </Form.Field>
  );
};

export default FormSelect;
