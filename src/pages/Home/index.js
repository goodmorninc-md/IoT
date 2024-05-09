import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";

import MyPopover from "@/components/Popover/Popover";

import Tabs from "./components/TabsControl";
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

import {
  GetStatsByWebAdmin,
  GetStatsOfCust,
  GetStatsOfOrg,
} from "@/services/Statistic";
import CreateOrg from "@/components/PopupSwiper/CreateOrg";
import MyToast from "@/components/Toast/toast";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";

export default function MainPage() {
  const [statis, setStatis] = useState({});

  const { current_Organization, OrganizationList, setOrganizationList } =
    useContext(OrganizationContext);
  //获取到设置的状态
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const User = authState.user;
  console.log(authState);
  let production = new Array(4).fill(0);
  let device = new Array(4).fill(0);
  useEffect(() => {
    //* 获取首页statis
    // Object.keys(User).length > 0
    if (User !== null && Object.keys(User).length > 0) {
      // console.log("User.roles.role", User.roles.role);
      if (User.roles[0].role === 1)
        GetStatsByWebAdmin(token).then((data) => {
          setStatis(data);
        });
      else if (User.roles[0].role / 10 === 1) {
        GetStatsOfOrg(token).then((data) => {
          setStatis(data);
        });
      } else {
        GetStatsOfCust(token).then((data) => {
          setStatis(data);
        });
      }
    }
  }, [authState]);
  //* 渲染首页数据
  if ("product" in statis && "device" in statis) {
    statis.product.map((e) => {
      return (production[e.status] = e.num);
    });
    statis.device.map((e) => {
      device[e.status] = e.num;
    });
  }

  return (
    <>
      {/* 添加组织栏 */}
      <MyTopBar LeftChildren={<InfoDrawer></InfoDrawer>}>
        <CreateButton></CreateButton>
      </MyTopBar>
      ;
      {current_Organization !== "首页" ? (
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
      ) : (
        <>
          <Cell.Group className="cellGroup">
            <Cell
              label={<OrganizationIcon className="Cell-label-icon" />}
              bordered={false}
              className="myCell content"
            >
              <div>
                <span>组织</span>
                <div className="cellText">{statis.organization}</div>
              </div>
            </Cell>
            <Cell
              // icon={<UserIcon></UserIcon>}
              label={<UserIcon className="Cell-label-icon"></UserIcon>}
              bordered={false}
              className="myCell content"
            >
              <div>
                客户
                <div className="cellText">{statis.customer}</div>
              </div>
            </Cell>
            <Cell
              // icon=
              label={<ProduIcon className="Cell-label-icon"></ProduIcon>}
              bordered={false}
              className="myCell content"
            >
              <div>
                <div style={{ textAlign: "right" }}>产品</div>
                <div className="cellIconAndText">
                  <ProduNormalIcon className="cellTextIcon"></ProduNormalIcon>
                  <span className="">{production[1]}</span>
                  <WrongIcon className="cellTextIcon"></WrongIcon>
                  <span className="">{production[2]}</span>
                </div>
              </div>
            </Cell>
            <Cell
              label={<DeviceIcon className="Cell-label-icon"></DeviceIcon>}
              bordered={false}
              className="myCell content"
            >
              <div>
                <div style={{ textAlign: "right" }}>设备</div>
                <div className="cellIconAndText">
                  <NormalIcon className="cellTextIcon"></NormalIcon>
                  <span className="">{production[1]}</span>
                  <NotWorkIcon className="cellTextIcon"></NotWorkIcon>
                  <span className="">{production[2]}</span>
                  <WrongIcon className="cellTextIcon"></WrongIcon>
                  <span>{production[3]}</span>
                </div>
              </div>
            </Cell>
          </Cell.Group>
        </>
      )}
      <MyTabBar></MyTabBar>
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
          console.log(value);
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
      content={"添加组织"}
    >
      {chil}
    </CreateOrg>
  );
}
