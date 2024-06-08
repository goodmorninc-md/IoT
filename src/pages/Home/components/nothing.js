
import MyTopBar from "@/components/TopBar/TopBar";

import MyPopover from "@/components/Popover/Popover";

import Tabs from "./TabsControl";
import { useState, useContext, useRef, useEffect } from "react";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";

import { Cell, Input } from "@arco-design/mobile-react";

import { IconQuestionCircle } from "@arco-design/mobile-react/esm/icon";
import "@/styles/home.less";
import { ReactComponent as OrganizationIcon } from "@/assets/icon/organization.svg";
import { ReactComponent as UserIcon } from "@/assets/icon/user.svg";
import { ReactComponent as ProduIcon } from "@/assets/icon/pruduction.svg";
import { ReactComponent as DeviceIcon } from "@/assets/icon/device.svg";
import { ReactComponent as NormalIcon } from "@/assets/icon/normal.svg";
import { ReactComponent as NotWorkIcon } from "@/assets/icon/notwork.svg";
import { ReactComponent as ProduNormalIcon } from "@/assets/icon/productNormal.svg";
import { ReactComponent as WrongIcon } from "@/assets/icon/wrong.svg";

import { CreateOrganization } from "@/services/Organization";

import CreateOrg from "@/components/PopupSwiper/CreateOrg";
import MyToast from "@/components/Toast/toast";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";

export default function MainPage() {
  

  const { current_Organization, OrganizationList, setOrganizationList } =
    useContext(OrganizationContext);
  //获取到设置的状态
  const { authState } = useContext(AuthContext);


  return (
    <>
      {/* 添加组织栏 */}
      <MyTopBar LeftChildren={<InfoDrawer></InfoDrawer>}>
        <CreateButton></CreateButton>
      </MyTopBar>
    </>
  );
}

function CreateButton({}) {
  const addData = useRef({});
  //获取到设置的状态
  const { current_Organization, OrganizationList, setOrganizationList } =
    useContext(OrganizationContext);

  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const User = authState.user;
  const keys = ["名称", "描述", "电话", "地址", "联系人"];
  const keysInEng = ["name", "description", "address", "contact", "phone"];
  const requiredIdx = [0];

  let chil = keys.map((value, idx) => {
    return (
      <Input
        label={value + ":"}
        required={requiredIdx.indexOf(idx) !== -1 ? true : false}
        onChange={(e) => {
          // console.log(value);
          addData.current[keysInEng[idx]] = e.target.value;
        }}
        clearable={true}
        border={true}
      />
    );
  });
  const handleConfirm = () => {
    CreateOrganization(addData.current, token).then((data) => {
      addData.current = {};
      setOrganizationList([...OrganizationList, data]);
      MyToast("success", "创建成功");
    });
  };

  return (
    <CreateOrg
      keys={keys}
      keysInEng={keysInEng}
      handleConfirm={handleConfirm}
      addData={addData.current}
      requiredIdx={requiredIdx}
      className={"Bu"}
    >
      {chil}
    </CreateOrg>
  );
}


