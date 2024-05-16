import { useState, useContext, useRef, useEffect } from "react";

import { Button, Cell, Input } from "@arco-design/mobile-react";

import { PopupSwiper } from "@arco-design/mobile-react";

import { UpdateDevice } from "@/services/device";
import MyToast from "@/components/Toast/toast";
export default function CreatePopup({
  productId,
  deviceId,
  deviceInfo,
  setDeviceInfo,
  visible,
  setVisible,
  update,
  setUpdate,
}) {
  const [newDevice, setNewDevice] = useState({ ...deviceInfo });
  useEffect(() => {
    if (visible === true) setNewDevice({ ...deviceInfo });
  }, [visible]);
  const requiredIdx = ["deviceKey", "period", "frequency"];
  const disabled = ["deviceKey"];

  const obj = {
    deviceKey: "deviceKey",
    name: "名称",
    period: "数据发送周期(秒)",
    frequency: "采样频率(Hz)",
    description: "描述",
  };

  const placeholders = [
    "唯一标识Device的编号，产品维度内唯一",
    "设备名称",
    "设备箱服务器发送数据的周期，单位:秒",
    "设备采样频率,单位:Hz",
    "",
  ];
  const checkRequire = () => {
    let flag = true;

    requiredIdx.map((e) => {
      if (
        e in newDevice &&
        (typeof newDevice[e] === "number" || newDevice[e].length > 0)
      ) {
        return;
      } else {
        flag = false;
      }
    });
    return flag;
  };

  function handleUpdate() {
    console.log(newDevice);
    UpdateDevice(productId, "", deviceId, newDevice).then((data) => {
      MyToast("success", "修改成功");
      setDeviceInfo({ ...newDevice });
      setNewDevice({});
      setUpdate(update + 1);
    });
  }
  let son1 = Object.keys(obj).map((key, idx) => {
    return (
      <Input
        required={requiredIdx.indexOf(key) !== -1}
        label={obj[key]}
        disabled={disabled.indexOf(key) !== -1}
        placeholder={placeholders[idx]}
        defaultValue={deviceInfo[key].toString()}
        onChange={(e) => {
          let temp = { ...newDevice };
          temp[key] = e.target.value;
          setNewDevice(temp);
        }}
      ></Input>
    );
  });

  return (
    <>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        {son1}
        <Button
          onClick={() => {
            if (checkRequire()) {
              setVisible(!visible);
              handleUpdate();
            } else {
              MyToast("warn", "请添加名称");
            }
          }}
        >
          确认修改
        </Button>
      </PopupSwiper>
    </>
  );
}
