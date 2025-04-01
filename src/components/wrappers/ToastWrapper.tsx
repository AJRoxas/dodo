'use client';

import { Toast } from 'radix-ui';
import Button from '@/components/Button';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createContext, useContext, useState } from 'react';

export interface ShowToastProps {
  title: string;
  description: string;

  // Actions
  icon?: IconDefinition;
  ariaLabel?: string;
  action?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;

  // Type
  type?: 'error' | 'success' | 'default' | undefined;
}

type ToastContextType = {
  showToast: ({
    title,
    description,
    icon,
    ariaLabel,
    action,
    onClick,
  }: ShowToastProps) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'error' | 'success' | 'default' | undefined>(
    undefined
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Icon style toast
  const [icon, setIcon] = useState<IconDefinition | undefined>(undefined);
  const [ariaLabel, setAriaLabel] = useState<string | undefined>(undefined);
  // Action style toast
  const [action, setAction] = useState<string | undefined>(undefined);
  const [onClick, setOnClick] = useState<
    React.MouseEventHandler<HTMLElement> | undefined
  >(undefined);

  const showToast = ({
    title,
    description,
    icon,
    ariaLabel,
    action,
    onClick,
    type,
  }: ShowToastProps) => {
    setOpen(false);
    setTimeout(() => {
      setTitle(title);
      setDescription(description);
      setIcon(icon);
      setAriaLabel(ariaLabel);
      setAction(action);
      setOnClick(onClick);
      setType(type);
      setOpen(true);
    }, 200);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider duration={5000}>
        {children}
        <Toast.Root
          className={`toast-root ${type}`}
          open={open}
          onOpenChange={setOpen}
        >
          <Toast.Title className="toast-title">{title}</Toast.Title>
          <Toast.Description asChild>
            <div className="toast-description">{description}</div>
          </Toast.Description>
          <Toast.Action
            className="toast-action"
            asChild
            altText="Goto schedule to undo"
          >
            {icon !== undefined ? (
              <Button
                icon={icon}
                size="fas"
                onClick={onClick}
                ariaLabel={ariaLabel}
                customStyles="toast-action"
              />
            ) : action !== undefined ? (
              <button
                className="toast-action hover:cursor-pointer"
                onClick={onClick}
              >
                {action}
              </button>
            ) : (
              <Button
                icon={faXmark}
                size="fas"
                ariaLabel="Dismiss"
                customStyles="toast-action"
              />
            )}
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="toast-viewport" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastWrapper');
  }
  return context;
};

export default ToastWrapper;
