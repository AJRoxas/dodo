import { Switch } from "radix-ui";

// Make id a variable add label and such next
const FormSwitch = () => {
  return (
    <Switch.Root className="switch-root" id="airplane-mode">
      <Switch.Thumb className="switch-thumb" />
    </Switch.Root>
  );
};

export default FormSwitch;
