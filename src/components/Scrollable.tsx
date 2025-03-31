import { ScrollArea } from 'radix-ui';

const Scrollable = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ScrollArea.Root type="hover" className="scroll-root">
      <ScrollArea.Viewport className="scroll-viewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="scroll-bar"
        orientation="vertical"
        forceMount={true}
      >
        <ScrollArea.Thumb className="scroll-thumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="scroll-bar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="scroll-thumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
};

export default Scrollable;
