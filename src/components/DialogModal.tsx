'use client';

import { Dialog } from 'radix-ui';
import Button from '@/components/Button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface DialogModalProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionForm?: string;
  actionAction?: React.MouseEventHandler<HTMLElement>
  trigger: React.ReactNode;
  body: React.ReactNode;
}

const DialogModal = ({
  title,
  description,
  actionLabel,
  actionForm,
  actionAction,
  trigger,
  body,
}: Readonly<DialogModalProps>) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="font-semibold text-2xl">
            {title}
          </Dialog.Title>
          <Dialog.Description className="font-semibold text-sm">
            {description}
          </Dialog.Description>
          <br></br>
          {body}
          <br></br>
          <Dialog.Close asChild>
            <Button form={actionForm} onClick={actionAction}>{actionLabel}</Button>
          </Dialog.Close>
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
  );
};

export default DialogModal;
