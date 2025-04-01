'use client';

import { Dialog } from 'radix-ui';
import Button from '@/components/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createContext, ReactNode, useContext, useState } from 'react';

interface DialogWrapperProps {
  title?: string;
  description?: string;
  content: ReactNode;
}

type DialogWrapperContextType = {
  openDialog: ({ title, description, content }: DialogWrapperProps) => void;
  closeDialog: () => void;
};

const DialogWrapperContext = createContext<
  DialogWrapperContextType | undefined
>(undefined);

const DialogWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [content, setContent] = useState<ReactNode>(<div></div>);

  const openDialog = ({ title, description, content }: DialogWrapperProps) => {
    setTitle(title);
    setDescription(description);
    setContent(content);
    setOpen(true);
  };

  const closeDialog = () => {
    setTitle(undefined);
    setDescription(undefined);
    setContent(<div></div>);
    setOpen(false);
  };

  return (
    <DialogWrapperContext.Provider
      value={{ openDialog: openDialog, closeDialog: closeDialog }}
    >
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content
            className="dialog-content"
            aria-describedby={description ?? undefined}
          >
            <div className="mb-10">
              {title && (
                <Dialog.Title className="font-semibold text-2xl">
                  {title}
                </Dialog.Title>
              )}

              {description && (
                <Dialog.Description className="font-semibold text-sm">
                  {description}
                </Dialog.Description>
              )}
            </div>
            {content}
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
    </DialogWrapperContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogWrapperContext);
  if (!context) {
    throw new Error('useDialogWrapper must be used within a DialogWrapper');
  }
  return context;
};

export default DialogWrapper;
