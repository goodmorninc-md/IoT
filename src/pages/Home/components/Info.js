// EditOrganization.js
import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Input, Button, Cell } from "@arco-design/mobile-react";
import { EnterpeiseContext, OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { ReactComponent as ChangeInfoIcon } from "@/assets/icon/changeInfo.svg";
import {
  GetOneOrganization,
  UpdateOneOrganization,
} from "@/services/Organization";
import MyToast from "@/components/Toast/toast";
import "@/styles/home.less";
const EditOrganization = ({ currentSelect }) => {
  const [organizationInfo, setOrganizationInfo] = useState({});
  const [editStatus, setEditStatus] = useState(false);

  var NowOrganiationInfo = organizationInfo;
  const { authState, login, logout } = useContext(AuthContext); //获取登录token
  const token = authState.token;

  const { current_Organization } = useContext(OrganizationContext);

  useEffect(() => {
    //* 组织变化，信息页一起修改
    console.log("eff");
    GetOneOrganization(current_Organization.id, token).then((data) => {
      setOrganizationInfo(data);

      //* 获得信息更改
      //* 根据organizationInfo的变化执行相关操作
    });
  }, [currentSelect]);

  function handleInfoChange(e) {
    //发起网络请求

    UpdateOneOrganization(
      current_Organization.id,
      token,
      NowOrganiationInfo
    ).then((data) => {
      setOrganizationInfo(NowOrganiationInfo);
      setEditStatus(!editStatus);
      MyToast("success", "修改成功");
    });
  }
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
  return (
    <>
      <Button
        icon={<ChangeInfoIcon className="iconInfo" />}
        bgColor={bgColor}
        onClick={() => {
          setEditStatus(!editStatus);
        }}
        color={colorConfig}
        className="tab-firstP-button"
      >
        编辑
      </Button>

      {editStatus ? (
        <div>
          <Input
            label="联系人"
            defaultValue={NowOrganiationInfo.contact}
            onChange={(e) => (NowOrganiationInfo.contact = e.target.value)}
          />
          <Input
            label="地址"
            defaultValue={NowOrganiationInfo.address}
            onChange={(e) => (NowOrganiationInfo.address = e.target.value)}
          />
          <Input
            label="电话"
            defaultValue={NowOrganiationInfo.phone}
            onChange={(e) => (NowOrganiationInfo.phone = e.target.value)}
          />
          <Input
            label="描述"
            defaultValue={NowOrganiationInfo.description}
            onChange={(e) => (NowOrganiationInfo.description = e.target.value)}
          />
          <Button onClick={handleInfoChange}>保存更改</Button>
        </div>
      ) : (
        <Cell.Group >
          <Cell className="InfoCellGroup" label="联系人" bordered={true}>
            {organizationInfo.contact}
          </Cell>
          <Cell className="InfoCellGroup" label="地址">
            {organizationInfo.address}
          </Cell>
          <Cell className="InfoCellGroup" label="电话">
            {organizationInfo.phone}
          </Cell>
          <Cell className="InfoCellGroup" label="描述">
            {organizationInfo.description}
          </Cell>
        </Cell.Group>
      )}
    </>
  );
};
//需要判断优先级
export default EditOrganization;
