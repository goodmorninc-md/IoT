import { Popover, Button } from "@arco-design/mobile-react";
import { Children } from "react";

export default function MyPopover({ content, children }) {
  return (
    <div key="black">
      <Popover
        content={content}
        direction="topRight"
        onChange={(visible) => {
          console.log("The bubble state is switched to", visible);
        }}
      >
        {children}
      </Popover>
    </div>
  );
}
