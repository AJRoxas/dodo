'use client';

import { Dialog } from 'radix-ui';
import Button from '@/components/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createContext, useContext, useState } from 'react';

interface DialogModalProps {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  body: React.ReactNode;
}

type DialogModalContextType = {
  setDialogModal: (state: boolean) => void;
};

const DialogModalContext = createContext<DialogModalContextType | undefined>(
  undefined
);

const DialogModal = ({
  title,
  description,
  trigger,
  body,
}: Readonly<DialogModalProps>) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogModalContext.Provider value={{ setDialogModal: setOpen }}>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content"
            aria-describedby={description ?? undefined}
          >
            <div className="mb-10">
              <Dialog.Title className="font-semibold text-2xl">
                {title}
              </Dialog.Title>

              {description && (
                <Dialog.Description className="font-semibold text-sm">
                  {description}
                </Dialog.Description>
              )}
            </div>
            {body}
            <Dialog.Close asChild>
              <Button
                size="fas"
                icon={faXmark}
                ariaLabel="Close"
                customStyles="dialog-dismiss"
              />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </DialogModalContext.Provider>
  );
};

export const useDialogModal = () => {
  const context = useContext(DialogModalContext);
  if (!context) {
    throw new Error('useDialogModal must be used within a DialogModal');
  }
  return context;
};

export default DialogModal;
