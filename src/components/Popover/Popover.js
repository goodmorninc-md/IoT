import { Popover, Button } from "@arco-design/mobile-react";
import { Children } from "react";
import { IconQuestionCircle } from "@arco-design/mobile-react/esm/icon";

export default function MyPopover({
  content,
  children,
  direction = "topRight",
}) {
  return (
    <div key="black">
      <Popover
        content={content}
        direction={direction}
        onChange={(visible) => {
          // console.log(visible);
        }}
      >
        <IconQuestionCircle className="iconInfoFpage"></IconQuestionCircle>
      </Popover>
    </div>
  );
}
