import { ScrollArea } from 'radix-ui';

const Scrollable = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ScrollArea.Root type='auto' className="ScrollAreaRoot">
      <ScrollArea.Viewport className="ScrollAreaViewport">
        {children}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="vertical"
        forceMount={true}
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className="ScrollAreaScrollbar"
        orientation="horizontal"
      >
        <ScrollArea.Thumb className="ScrollAreaThumb" />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className="ScrollAreaCorner" />
    </ScrollArea.Root>
  );
};

export default Scrollable;
