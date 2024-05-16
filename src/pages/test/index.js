import React, { useState } from "react";
import { Popup, Button, Picker, Cell } from "@arco-design/mobile-react";
import SelectDemo from "@/components/select/select";
const options = [
  { label: "选项1", value: "1" },
  { label: "选项2", value: "2" },
  // 更多选项...
];

export default function PickerDemo() {
  const [visible, setVisible] = React.useState(false);
  const [singleVisible, setSingleVisible] = React.useState(false);
  const [value, setValue] = React.useState(["Wednesday", "Morning"]);
  const [singleValue, setSingeValue] = React.useState(["Beijing"]);
  const pickerRef = React.useRef();
  const [popupVisible, setPopupVisible] = useState(false);

  const data = React.useMemo(() => {
    return [
      [
        { label: "Monday", value: "Monday" },
        { label: "Tuesday", value: "Tuesday" },
        { label: "Wednesday", value: "Wednesday" },
        { label: "Thursday", value: "Thursday" },
        { label: "Friday", value: "Friday" },
        { label: "Saturday", value: "Saturday" },
        { label: "Sunday", value: "Sunday" },
      ],
      [
        { label: "Morning", value: "Morning" },
        { label: "Afternoon", value: "Afternoon" },
        { label: "Evening", value: "Evening" },
      ],
    ];
  }, []);

  const single = React.useMemo(() => {
    return [
      [
        { label: "Hubei", value: "Hubei" },
        { label: "Henan", value: "Henan" },
        { label: "Hunan", value: "Hunan" },
        { label: "Beijing", value: "Beijing" },
        { label: "Shanghai", value: "Shanghai" },
        { label: "Guangdong", value: "Guangdong" },
        { label: "Chongqing", value: "Chongqing" },
        { label: "Sichuan", value: "Sichuan" },
      ],
    ];
  }, []);

  return (
    <>
      <SelectDemo />
      {/* <Cell.Group bordered={false}>
        <Button onClick={() => setPopupVisible(!visible)}></Button>
        <Popup
          visible={popupVisible}
          onClose={() => setPopupVisible(!popupVisible)}
          className="my-popup"
        >
          <Cell
            label="Single selection"
            showArrow
            onClick={() => {
              setSingleVisible(true);
            }}
          />
        </Popup>
        <Cell
          label="Multiple selection"
          showArrow
          onClick={() => {
            setVisible(true);
          }}
        />
      </Cell.Group> */}
      
    </>
  );
}
