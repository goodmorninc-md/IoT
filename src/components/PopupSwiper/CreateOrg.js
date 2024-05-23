import { PopupSwiper, Input, Button ,Cell} from "@arco-design/mobile-react";
import { useState } from "react";
import { ReactComponent as AddOrgaIcon } from "@/assets/icon/addOrganization.svg";
import React from "react";
import MyToast from "@/components/Toast/toast";


export default function Create({
  keysInEng,
  children,
  requiredIdx = [0],
  addData,
  handleConfirm,
  content,
  icon = <AddOrgaIcon></AddOrgaIcon>,
  className,
  popupInfo=""
}) {
  const [visible, setVisible] = useState(false);
  //获取到设置的状态
  
  //* Button颜色
  const bgColor = {
    normal: "transparent",
    active: "#fbe1d9",
    disabled: "#FFF",
  };
  const colorConfig = {
    normal: "black",
    active: "#F53F3F",
    disabled: "#FBACA3",
  };
  
  //* 添加
  const handleAdd= () => {
    setVisible(!visible);
  };
  const checkRequire = () => {
    let flag = true;
    requiredIdx.map((e) => {
      if (
        keysInEng[e] in addData &&
        addData[keysInEng[e]].length > 0
      ) {
        return;
      } else {
        flag = false;
      }
    });
    return flag;
  };
  let ic = React.cloneElement(icon,{className:"iconInfo"})
  return (
    <>
      <Button
        className={className}
        color={colorConfig}
        bgColor={bgColor}
        icon={ic}
        onClick={() => {
          handleAdd();
        }}
      >
        {content}
      </Button>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        <Cell className="popup-title">{popupInfo}</Cell>
        {children}
        <Button
          onClick={() => {
            if (checkRequire()) {
              setVisible(!visible);
              handleConfirm();
            }
            else{
              MyToast("warn","请添加名称")
            }
          }}
        >
          确认添加
        </Button>
      </PopupSwiper>
    </>
  );
}
