// EditOrganization.js
import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Input, Button, Cell, PopupSwiper } from "@arco-design/mobile-react";
import { EnterpeiseContext, OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { ReactComponent as ChangeInfoIcon } from "@/assets/icon/changeInfo.svg";
import {
  GetOneOrganization,
  UpdateOneOrganization,
} from "@/services/Organization";
import MyToast from "@/components/Toast/toast";
import "@/styles/home.less";
import { bgColor } from "@/styles/buttonColorConfig";
const EditOrganization = ({ currentSelect }) => {
  const [organizationInfo, setOrganizationInfo] = useState({});

  // const NowOrganiationInfo = useRef({ ...organizationInfo });
  // console.log(NowOrganiationInfo.current)
  const { authState, login, logout } = useContext(AuthContext); //获取登录token
  const token = authState.token;

  const { current_Organization } = useContext(OrganizationContext);

  useEffect(() => {
    //* 组织变化，信息页一起修改
    GetOneOrganization(current_Organization.id, token)
      .then((data) => {
        setOrganizationInfo(data);

        //* 获得信息更改
        //* 根据organizationInfo的变化执行相关操作
      })
      .catch((error) => {
        MyToast("error", "获取组织信息失败");
      });
  }, [currentSelect]);

  return (
    <>
      <InfoPopup
        organizationInfo={organizationInfo}
        setOrganizationInfo={setOrganizationInfo}
      ></InfoPopup>
      <Cell.Group>
        <Cell className="InfoCellGroup" label="联系人" bordered={false}>
          {organizationInfo.contact}
        </Cell>
        <Cell className="InfoCellGroup" label="地址" bordered={false}>
          {organizationInfo.address}
        </Cell>
        <Cell className="InfoCellGroup" label="电话" bordered={false}>
          {organizationInfo.phone}
        </Cell>
        <Cell className="InfoCellGroup" label="描述" bordered={false}>
          {organizationInfo.description}
        </Cell>
      </Cell.Group>
    </>
  );
};
//需要判断优先级
export default EditOrganization;

function InfoPopup({ organizationInfo, setOrganizationInfo }) {
  const [visible, setVisible] = useState(false);
  const { current_Organization } = useContext(OrganizationContext);
  const newInfo = { ...organizationInfo };
  const colorConfig = {
    normal: "black",
    active: "#F53F3F",
    disabled: "#FBACA3",
  };

  function handleInfoChange(e) {
    //发起网络请求
    if ("contact" in newInfo && newInfo.contact.length > 0)
      UpdateOneOrganization(current_Organization.id, newInfo)
        .then((data) => {
          setOrganizationInfo({ ...newInfo });
          // setEditStatus(!editStatus);
          MyToast("success", "修改成功");
          setVisible(!visible);
        })
        .catch((error) => {
          MyToast("error", "修改组织信息失败");
        });
    else {
      MyToast("warn", "联系人不可为空");
    }
  }
  return (
    <>
      <Button
        icon={<ChangeInfoIcon className="iconInfo" />}
        bgColor={bgColor}
        onClick={() => {
          setVisible(!visible);
        }}
        color={colorConfig}
        className="tab-firstP-button"
      >
        编辑
      </Button>
      <PopupSwiper
        direction="bottom"
        exitDirection={["bottom", "right"]}
        visible={visible}
        close={() => setVisible(!visible)}
      >
        <div>
          <Input
            label="联系人"
            defaultValue={newInfo.contact}
            onChange={(e) => (newInfo.contact = e.target.value)}
            required
          />
          <Input
            label="地址"
            defaultValue={newInfo.address}
            onChange={(e) => (newInfo.address = e.target.value)}
          />
          <Input
            label="电话"
            defaultValue={newInfo.phone}
            onChange={(e) => (newInfo.phone = e.target.value)}
          />
          <Input
            label="描述"
            defaultValue={newInfo.description}
            onChange={(e) => (newInfo.description = e.target.value)}
          />
          <Button onClick={handleInfoChange}>保存更改</Button>
        </div>
      </PopupSwiper>
    </>
  );
}
