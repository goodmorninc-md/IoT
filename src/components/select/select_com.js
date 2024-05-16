import { Picker, Cell } from "@arco-design/mobile-react";
import { useState, useMemo, useRef } from "react";

export default function Pickers({
  label,
  singleList,
  text,
  handleChange,
  disabled=false,
}) {
  const [singleVisible, setSingleVisible] = useState(false);


console.log(disabled)
  return (
    <>
      <Cell
        label={label}
        showArrow
        onClick={() => {
          setSingleVisible(true);
        }}
      >
        {text}
      </Cell>

      <Picker
        visible={singleVisible}
        cascade={false}
        data={singleList}
        maskClosable={true}
        onHide={() => {
          setSingleVisible(false);
        }}
        onOk={(val, data) => {
          handleChange(val[0]);
        }}
        disabled={disabled}
        // disabled !== undefined ? disabled :false
      />
    </>
  );
}
