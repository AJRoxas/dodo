'use client';

import { AlertDialog } from 'radix-ui';
import Button from '@/components/Button';
import { createContext, useContext, useState } from 'react';

interface AlertProviderProps {
  title?: string;
  description?: string;
  cancelLabel?: string;
  actionLabel?: string;
  onAction?: React.MouseEventHandler;
}

type AlertProviderContextType = {
  openAlert: ({
    title,
    description,
    cancelLabel,
    actionLabel,
    onAction,
  }: AlertProviderProps) => void;

  closeAlert: () => void;
};

const AlertProviderContext = createContext<AlertProviderContextType | undefined>(
  undefined
);

const AlertProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [cancelLabel, setCancelLabel] = useState<string | undefined>();
  const [actionLabel, setActionLabel] = useState<string | undefined>();
  const [onAction, setOnAction] = useState<
    React.MouseEventHandler | undefined
  >();

  const openAlert = ({
    title,
    description,
    cancelLabel,
    actionLabel,
    onAction,
  }: AlertProviderProps) => {
    setTitle(title);
    setDescription(description);
    setCancelLabel(cancelLabel);
    setActionLabel(actionLabel);
    setOnAction(onAction);
    setOpen(true);
  };

  const closeAlert = () => {
    setTitle(undefined);
    setDescription(undefined);
    setCancelLabel(undefined);
    setActionLabel(undefined);
    setOnAction(undefined);
    setOpen(false);
  };

  return (
    <AlertProviderContext.Provider
      value={{ openAlert: openAlert, closeAlert: closeAlert }}
    >
      {children}
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="dialog-overlay" />
          <AlertDialog.Content
            className="dialog-content flex flex-col gap-2"
            aria-describedby={description ?? undefined}
          >
            {title && (
              <AlertDialog.Title className="font-semibold text-2xl">
                {title}
              </AlertDialog.Title>
            )}

            {description && (
              <AlertDialog.Description>{description}</AlertDialog.Description>
            )}
            <div className="mt-10 flex justify-between md:justify-end md:gap-4">
              <Button isHalved={true} onClick={closeAlert}>
                {cancelLabel ?? 'Cancel'}
              </Button>
              <Button
                isHalved={true}
                customStyles="!bg-error"
                onClick={onAction}
              >
                {actionLabel ?? 'Confirm'}
              </Button>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </AlertProviderContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertProviderContext);
  if (!context) {
    throw new Error('useAlertProvider must be used within a AlertProvider');
  }
  return context;
};

export default AlertProvider;
