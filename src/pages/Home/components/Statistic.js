import MyPopover from "@/components/Popover/Popover";

import Tabs from "./TabsControl";
import { useState, useContext, useRef, useEffect } from "react";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";

import { Cell, Input } from "@arco-design/mobile-react";

import { IconQuestionCircle } from "@arco-design/mobile-react/esm/icon";
import { GetOneOrganization } from "@/services/Organization";

export function OrganizationStatistic() {
  const { current_Organization, OrganizationList, setOrganizationList } =
    useContext(OrganizationContext);
  //获取到设置的状态
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const role =
    authState.user === null ? -10 : authState.user.roles[0].role / 10;
  useEffect(() => {
    // GetOneOrganization(current_Organization.id, token).then((data) => {});
  }, []);
  return (
    <>
      <div>
        <Cell.Group className="cellGroup">
          <Cell
            label={
              <div className="cellIconAndText">
                客户总数
                <MyPopover content={"该组织所有客户数量"}></MyPopover>
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
                <MyPopover content={"该组织所有产品总数"}></MyPopover>
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
                <MyPopover content={"该组织所有设备总数"}></MyPopover>
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
