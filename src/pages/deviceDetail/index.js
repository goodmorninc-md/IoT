import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
//* context service
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { ProductContext } from "@/context/Product";
import { Button, Cell, Input } from "@arco-design/mobile-react";
import { PopupSwiper, Tabs } from "@arco-design/mobile-react";
import { FindDevice } from "@/services/device";

//* component
import CreatePopup from "./component/createPopup";
import SelectPopup from "./component/choose";
import MyTopBar from "@/components/TopBar/TopBar";
import MyToast from "@/components/Toast/toast";
import { ReactComponent as IconGetBack } from "@/assets/icon/getBack.svg";
import GetTime from "@/components/function/time";
import { bgColor } from "@/styles/buttonColorConfig";
import CellNodata from "@/components/InfoList/lackData";
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
  const { deviceId } = useParams();
  //todo effect放在这里是为了后续在topBar上面放设备信息
  useEffect(() => {
    FindDevice(productId, "", deviceId)
      .then((data) => {
        setDeviceInfo(data);
      })
      .catch((error) => {
        MyToast("error","获取设备详情失败");
      });
  }, []);
  return (
    <>
      <MyTopBar
        LeftChildren={
          <Button
            icon={<IconGetBack className="iconInfoFpage"></IconGetBack>}
            onClick={() => navigate(`/device`)}
            bgColor={bgColor}
          ></Button>
        }
      ></MyTopBar>
      <div className="currentDetail">{deviceInfo.name}</div>
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
        type="card"
        tabs={tabData}
        defaultActiveTab={defaultIndex}
        onAfterChange={(e, idx) => {
          const url = new URL(window.location); // 获取当前页面的完整 URL
          url.searchParams.set("tab", l[idx]); // 设置或更新 'tab' 参数
          navigate(url.pathname + url.search); // 导航到新的 URL
        }}
      >
        <DeviceDetailTab
          productId={productId}
          deviceId={deviceId}
          deviceInfo={deviceInfo}
          setDeviceInfo={setDeviceInfo}
          update={update}
          setUpdate={setUpdate}
        ></DeviceDetailTab>
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
function DeviceDetailTab({
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
    frequency: "采样频率(Hz)",
    description: "描述",
  };
  let deviceTemp = { ...deviceInfo };
  deviceTemp.activatedAt = GetTime(deviceInfo.activatedAt);
  deviceTemp.lastOnlineAt = GetTime(deviceInfo.lastOnlineAt);
  deviceTemp.status = status[deviceTemp.status];
  deviceTemp.period = deviceTemp.period.toString();
  deviceTemp.frequency = deviceTemp.frequency.toString();
  let groups = Object.keys(obj).map((key, idx) => {
    if (deviceInfo[key] === undefined) return <></>;
    return (
      <Cell label={obj[key]} text={deviceTemp[key]} bordered={false}></Cell>
    );
  });
  return (
    <Cell.Group>
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
      <Button onClick={() => setVisible(!visible)}>编辑</Button>
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
        {/* <Button onClick={() => setVisible(!visible)}>更新</Button> */}

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
        {/* <SelectPopup
          productId={productId}
          deviceId={deviceId}
          deviceInfo={deviceInfo}
          setDeviceInfo={setDeviceInfo}
          visible={visible}
          setVisible={setVisible}
          update={update}
          setUpdate={setUpdate}
        ></SelectPopup> */}
      </>
    );
  else
    return (
      <>
        <Button onClick={() => setVisible(!visible)}>更新</Button>
        <CellNodata></CellNodata>
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
}
function MappingList({ info }) {
  const type = ["", "JSON", "Binary"];
  return (
    <tr>
      <td className="tr-text">{info.name}</td>
      <td className="tr-text">{info.description}</td>
      <td className="mapping-list">{type[info.type]}</td>
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
        <Button onClick={() => setVisible(!visible)}>更新</Button>

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
          type={2}
        ></SelectPopup>
      </>
    );
  else
    return (
      <>
        <Cell className="popup-title">请选择客户</Cell>
        <Button onClick={() => setVisible(!visible)}>更新</Button>
        <SelectPopup
          productId={productId}
          deviceId={deviceId}
          deviceInfo={deviceInfo}
          setDeviceInfo={setDeviceInfo}
          visible={visible}
          setVisible={setVisible}
          update={update}
          setUpdate={setUpdate}
          type={2}
        ></SelectPopup>
      </>
    );
}
