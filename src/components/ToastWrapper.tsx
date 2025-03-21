import { Toast } from 'radix-ui';
import Button from '@/components/Button';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ToastWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;

  // Actions
  icon?: IconDefinition;
  ariaLabel?: string;
  action?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;

  // Type
  toastType?: 'error' | 'success' | 'default' | undefined;
}

const ToastWrapper = ({
  children,
  title,
  description,
  state,
  setState,
  icon,
  ariaLabel,
  action,
  onClick,
  toastType,
}: ToastWrapperProps) => {
  return (
    <Toast.Provider duration={5000}>
      {children}
      <Toast.Root className={`toast-root ${toastType}`} open={state} onOpenChange={setState}>
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
  );
};

export default ToastWrapper;
