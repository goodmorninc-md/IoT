import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import MyPopover from "@/components/Popover/Popover";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { Button, Cell, Input } from "@arco-design/mobile-react";
import { CreateOrganization } from "@/services/Organization";
import { GetProductListByOrg } from "@/services/Product";
import { PopupSwiper, Tabs } from "@arco-design/mobile-react";

import {
  GetDiviceList,
  FindDevice,
  UpdateDevice,
  DelDivce,
  CreateDevice,
} from "@/services/device";
import MyToast from "@/components/Toast/toast";
import MyDropDown from "@/components/Dropdown/dropdown";
import { ProductContext } from "@/context/Product";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import CreatePopup from "./component/createPopup";
import SelectPopup from "./component/choose";
import { ReactComponent as IconGetBack } from "@/assets/icon/getBack.svg";
export default function DeviceDetail({}) {
  const [deviceInfo, setDeviceInfo] = useState({});
  const [update, setUpdate] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const paramTab = query.get("tab");
  //* 获取productId,organizationId,deviceId
  const productId = query.get("productId");
  const organizationId = query.get("organizationId");
  const url = window.location.href;
  let [u, params] = url.split("?");
  let deviceId = u.split("/").reverse()[0];
  //todo effect放在这里是为了后续在topBar上面放设备信息
  useEffect(() => {
    FindDevice(productId, "", deviceId).then((data) => {
      setDeviceInfo(data);
    });
  }, [update]);
  return (
    <>
      <MyTopBar
        LeftChildren={
          <Button
            icon={<IconGetBack className="iconInfoFpage"></IconGetBack>}
            onClick={() => navigate(`/device`)}
          ></Button>
        }
      ></MyTopBar>
      <div>{deviceInfo.name}</div>
      <Tab
        paramTab={paramTab}
        productId={productId}
        deviceId={deviceId}
        deviceInfo={deviceInfo}
        setDeviceInfo={setDeviceInfo}
        setUpdate={setUpdate}
        update={update}
      ></Tab>
    </>
  );
}
function Tab({
  paramTab,
  productId,
  deviceId,
  deviceInfo,
  setDeviceInfo,
  setUpdate,
  update,
}) {
  const navigate = useNavigate();

  const tabData = [
    { title: "设备信息" },
    { title: "数据解析" },
    { title: "所属客户" },
  ];
  const l = ["detail", "mapping", "customer"];
  let defaultIndex = l.indexOf(paramTab) !== -1 ? l.indexOf(paramTab) : 0;
  return (
    <>
      <Tabs
        tabs={tabData}
        defaultActiveTab={defaultIndex}
        onAfterChange={(e, idx) => {
          const url = new URL(window.location); // 获取当前页面的完整 URL
          url.searchParams.set("tab", l[idx]); // 设置或更新 'tab' 参数
          navigate(url.pathname + url.search); // 导航到新的 URL
        }}
      >
        <DeviceIn
          productId={productId}
          deviceId={deviceId}
          deviceInfo={deviceInfo}
          setDeviceInfo={setDeviceInfo}
          update={update}
          setUpdate={setUpdate}
        ></DeviceIn>
        <DataMap
          deviceInfo={deviceInfo}
          setDeviceInfo={setDeviceInfo}
          productId={productId}
          deviceId={deviceId}
          update={update}
          setUpdate={setUpdate}
        ></DataMap>
        <BelongCust
          deviceInfo={deviceInfo}
          setDeviceInfo={setDeviceInfo}
          productId={productId}
          deviceId={deviceId}
          update={update}
          setUpdate={setUpdate}
        ></BelongCust>
      </Tabs>
    </>
  );
}
function DeviceIn({
  deviceInfo,
  setDeviceInfo,
  productId,
  deviceId,
  update,
  setUpdate,
}) {
  const [visible, setVisible] = useState(false);
  if (Object.keys(deviceInfo).length === 0) return <></>;
  const status = ["", "在线", "离线", "", "已禁用"];
  const obj = {
    deviceKey: "deviceKey",
    deviceSecret: "deviceSecret",
    status: "状态",
    period: "数据发送周期",
    activatedAt: "激活时间",
    lastOnlineAt: "最后在线时间",
    frequency: "采样频率",
    description: "描述",
  };
  let groups = Object.keys(obj).map((key, idx) => {
    if (deviceInfo[key] === undefined) return <></>;
    return (
      <Cell
        label={obj[key]}
        text={
          key !== "status"
            ? deviceInfo[key].toString()
            : status[deviceInfo[key]]
        }
      ></Cell>
    );
  });
  return (
    <Cell.Group>
      <Button onClick={() => setVisible(!visible)}>编辑</Button>
      {groups}
      <CreatePopup
        productId={productId}
        deviceId={deviceId}
        deviceInfo={deviceInfo}
        setDeviceInfo={setDeviceInfo}
        visible={visible}
        setVisible={setVisible}
        update={update}
        setUpdate={setUpdate}
      ></CreatePopup>
    </Cell.Group>
  );
}
function DataMap({
  deviceInfo,
  setDeviceInfo,
  productId,
  deviceId,
  update,
  setUpdate,
}) {
  const [visible, setVisible] = useState(false);
  if ("mapping" in deviceInfo)
    return (
      <>
        <div>
          数据解析
          <Button onClick={() => setVisible(!visible)}>更新</Button>
        </div>
        <table className="table">
          <thead className="TrTable">
            <tr>
              <th>名称</th>
              <th>描述</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <MappingList info={deviceInfo.mapping} />
          </tbody>
        </table>
        <SelectPopup
          productId={productId}
          deviceId={deviceId}
          deviceInfo={deviceInfo}
          setDeviceInfo={setDeviceInfo}
          visible={visible}
          setVisible={setVisible}
          update={update}
          setUpdate={setUpdate}
        ></SelectPopup>
      </>
    );
  else return <div>暂无数据</div>;
}
function MappingList({ info }) {
  const type = ["", "JSON", "Binary"];
  return (
    <tr>
      <td>{info.name}</td>
      <td>{info.description}</td>
      <td>{type[info.type]}</td>
    </tr>
  );
}
function BelongCust({
  deviceInfo,
  setDeviceInfo,
  productId,
  deviceId,
  update,
  setUpdate,
}) {
  const [visible, setVisible] = useState(false);
  if ("customer" in deviceInfo)
    return (
      <>
        <div>
          数据解析
          <Button onClick={() => setVisible(!visible)}>更新</Button>
        </div>
        <table className="table">
          <thead className="TrTable">
            <tr>
              <th>名称</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{deviceInfo.customer.name}</td>
            </tr>
          </tbody>
        </table>
        <SelectPopup
          productId={productId}
          deviceId={deviceId}
          deviceInfo={deviceInfo}
          setDeviceInfo={setDeviceInfo}
          visible={visible}
          setVisible={setVisible}
          update={update}
          setUpdate={setUpdate}
        ></SelectPopup>
      </>
    );
  else
    return (
      <>
        <div>请选择客户</div>
        <Button onClick={() => setVisible(!visible)}>更新</Button>
      </>
    );
}
