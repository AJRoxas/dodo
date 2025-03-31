'use client';

import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tags } from '@prisma/client';
import { Select } from 'radix-ui';
import React, { RefObject, useState } from 'react';

interface SelectItemProps
  extends Omit<React.ComponentProps<typeof Select.Item>, 'value' | 'children'> {
  value: string;
  children: React.ReactNode;
}

const SelectItem = ({
  value,
  children,
  ...rest
}: Readonly<SelectItemProps>) => {
  return (
    <Select.Item className="select-item" value={value} {...rest}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="select-item-indicator">
        <FontAwesomeIcon
          icon={faCheck}
          className="h-4! fill-primary"
          fixedWidth
        />
      </Select.ItemIndicator>
    </Select.Item>
  );
};

interface SelectDropdownProps {
  selected: string;
  onChange: (value: string) => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  options: tags[];
  placeholder?: string;
}

const SelectDropdown = ({
  selected = '',
  onChange,
  triggerRef,
  options,
  placeholder,
}: Readonly<SelectDropdownProps>) => {
  const [value, setValue] = useState(selected ?? '');

  const changeHandler = (value: string) => {
    setValue(value);
    onChange(value);
  }
  return (
    <Select.Root value={value} onValueChange={changeHandler}>
      <Select.Trigger
        className="form-select"
        aria-label="Food"
        ref={triggerRef}
      >
        <Select.Value placeholder={placeholder ?? 'Select'} />
        <Select.Icon>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="h-4! fill-primary"
            fixedWidth
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="select-content">
          <Select.ScrollUpButton className="select-scroll-button">
            <FontAwesomeIcon
              icon={faChevronUp}
              className="h-4! fill-primary"
              fixedWidth
            />
          </Select.ScrollUpButton>
          <Select.Viewport className="select-viewport">
            {options.map((option) => {
              return (
                <SelectItem key={option.id} value={option.id.toString()}>
                  {option.name}
                </SelectItem>
              );
            })}
          </Select.Viewport>

          <Select.ScrollDownButton className="select-scroll-button">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="h-4! fill-primary"
              fixedWidth
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectDropdown;
