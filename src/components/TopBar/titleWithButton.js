import React from "react";
import { Button } from "@arco-design/mobile-react";
import { IconEdit } from "@arco-design/mobile-react/esm/icon";
import { bgColor } from "@/styles/buttonColorConfig";
export default function TitleWithButton({
  ButtonIcon = <IconEdit className="button-icon"></IconEdit>,
  title,
  handleClick,
}) {
  // 克隆 ButtonIcon 并添加 className
  const clonedButtonIcon = React.cloneElement(ButtonIcon, {
    className: `button-icon ${ButtonIcon.props.className || ""}`,
  });
  return (
    <div className="div-text-button">
      <span className="occupancy"></span>
      <span className="text-center">{title}</span>
      <Button
        onClick={handleClick}
        className="cell-button"
        icon={clonedButtonIcon}
        bgColor={bgColor}
      ></Button>
    </div>
  );
}
