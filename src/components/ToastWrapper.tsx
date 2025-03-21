import { Toast } from "radix-ui";

interface ToastWrapperProps {
  children: React.ReactNode;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToastWrapper = ({children, state, setState}:ToastWrapperProps) => {
  return (
    <Toast.Provider duration={5000}>
      {children}
      <Toast.Root className="toast-root" open={state} onOpenChange={setState}>
        <Toast.Title className="ToastTitle">Scheduled: Catch up</Toast.Title>
        <Toast.Description asChild>
          <div className="ToastDescription">
            Test this out
          </div>
        </Toast.Description>
        <Toast.Action
					className="ToastAction"
					asChild
					altText="Goto schedule to undo"
				>
					<button className="Button">Undo</button>
				</Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="toast-viewport" />
    </Toast.Provider>
  );
};

export default ToastWrapper;
