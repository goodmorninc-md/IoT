import { Picker, Cell } from "@arco-design/mobile-react";
import { useState, useMemo, useRef } from "react";

export default function Pickers({
  label,
  singleList,
  text,
  handleChange,
  disabled = false,
  title = "",
}) {
  const [singleVisible, setSingleVisible] = useState(false);
  // console.log(singleList)
  // const single = useMemo(() => {
  //   return [
  //     [
  //       { label: "Hubei", value: "Hubei" },
  //       { label: "Henan", value: "Henan" },
  //       { label: "Hunan", value: "Hunan" },
  //       { label: "Beijing", value: "Beijing" },
  //       { label: "Shanghai", value: "Shanghai" },
  //       { label: "Guangdong", value: "Guangdong" },
  //       { label: "Chongqing", value: "Chongqing" },
  //       { label: "Sichuan", value: "Sichuan" },
  //     ],
  //   ];
  // }, []);
  return (
    <>
      <Cell
        label={label}
        showArrow
        onClick={() => {
          if (singleList[0].length !== 0) setSingleVisible(true);
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
          // console.log(val)
          if(val)
            handleChange(val[0]);
        }}
        disabled={disabled}
        title={title}
        className="button-style"
      />
    </>
  );
}
