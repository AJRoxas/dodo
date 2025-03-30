import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from 'radix-ui';
import React, { RefObject } from 'react';

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
  value: string;
  onChange: (value: string) => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
}

const SelectDropdown = ({
  value = '',
  onChange,
  triggerRef,
}: Readonly<SelectDropdownProps>) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="form-select"
        aria-label="Food"
        ref={triggerRef}
      >
        <Select.Value placeholder="Select a fruit…" />
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
            <Select.Group>
              <Select.Label className="select-label">Fruits</Select.Label>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </Select.Group>

            <Select.Separator className="select-separator" />

            <Select.Group>
              <Select.Label className="select-label">Vegetables</Select.Label>
              <SelectItem value="aubergine">Aubergine</SelectItem>
              <SelectItem value="broccoli">Broccoli</SelectItem>
              <SelectItem value="carrot" disabled>
                Carrot
              </SelectItem>
              <SelectItem value="courgette">Courgette</SelectItem>
              <SelectItem value="leek">Leek</SelectItem>
            </Select.Group>

            <Select.Separator className="select-separator" />

            <Select.Group>
              <Select.Label className="select-label">Meat</Select.Label>
              <SelectItem value="beef">Beef</SelectItem>
              <SelectItem value="chicken">Chicken</SelectItem>
              <SelectItem value="lamb">Lamb</SelectItem>
              <SelectItem value="pork">Pork</SelectItem>
            </Select.Group>
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
