import MyTabBar from "@/components/TabBar/TabBar";
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

import {
  CreateOrganization,
  GetOneOrganization,
} from "@/services/Organization";

import {
  GetStatsByWebAdmin,
  GetStatsOfCust,
  GetStatsOfOrg,
} from "@/services/Statistic";
import CreateOrg from "@/components/PopupSwiper/CreateOrg";
import MyToast from "@/components/Toast/toast";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";

export function OrganizationStatistic() {
  const { current_Organization, OrganizationList, setOrganizationList } =
    useContext(OrganizationContext);
  //获取到设置的状态
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const role =
    authState.user === null ? -10 : authState.user.roles[0].role / 10;
  useEffect(() => {
    GetOneOrganization(current_Organization.id, token).then((data) => {});
  }, []);
  return (
    <>
      <div>
        <Cell.Group className="cellGroup">
          <Cell
            label={
              <div className="cellIconAndText">
                客户总数
                <MyPopover content={"该组织所有客户数量"}>
                  <IconQuestionCircle className="iconInfoFpage"></IconQuestionCircle>
                </MyPopover>
              </div>
            }
            bordered={false}
            className="myCell content"
          >
            <div>{123}</div>
          </Cell>

          <Cell
            label={
              <div className="cellIconAndText">
                产品总数
                <MyPopover content={"该组织所有产品总数"}>
                  <IconQuestionCircle className="iconInfoFpage"></IconQuestionCircle>
                </MyPopover>
              </div>
            }
            bordered={false}
            className="myCell content"
          >
            <div>{11}</div>
          </Cell>
          <Cell
            label={
              <div className="cellIconAndText">
                设备总数
                <MyPopover content={"该组织所有设备总数"}>
                  <IconQuestionCircle className="iconInfoFpage"></IconQuestionCircle>
                </MyPopover>
              </div>
            }
            bordered={false}
            className="myCell content"
          >
            <div>{22}</div>
          </Cell>
        </Cell.Group>
      </div>
      <Tabs
        tabData={[{ title: "组织信息" }, { title: "成员管理" }]}
        className="content"
      ></Tabs>
    </>
  );
}
