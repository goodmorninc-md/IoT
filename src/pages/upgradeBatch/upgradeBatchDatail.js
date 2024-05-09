import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  GetFirmwareList,
  CreateFirmware,
  ShowDetailOfFirmware,
  UpdateFirmware,
  DelFirmware,
} from "@/services/firmware";
import {
  ListAllUbOfFirmware,
  CreateUB,
  ShowDetailOfUB,
  DelUB,
} from "@/services/upgradeBatch";
import {
  Button,
  Cell,
  DropdownMenu,
  Steps,
  DatePicker,
  Tabs,
} from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { FirmwareContext } from "@/context/firmware";

export default function UpgradedetailDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const url = window.location.href;
  const query = new URLSearchParams(location.search);
  //* 不存在则为null
  const paramTab = query.get("tab");

  const list = url.split("/").reverse();
  const upgradeBatchId = list[0];
  const firmwareId = list[2];
  const productId = list[4];
  const [UbDetail, setUbDetail] = useState({});
  useEffect(() => {
    ShowDetailOfUB(productId, upgradeBatchId).then((data) => {
      setUbDetail(data);
    });
  }, []);
  const tabData = [{ title: "设备列表" }, { title: "批次信息" }];
  const l = ["device", "batch"];
  let defaultIndex = l.indexOf(paramTab) !== -1 ? l.indexOf(paramTab) : 0;
  return (
    <>
      <MyTopBar
        LeftChildren={
          <Button
            onClick={() => {
              navigate(
                `/product/${productId}/firmware/${firmwareId}?tab=batch`
              );
            }}
          >
            返回
          </Button>
        }
      ></MyTopBar>
      <Tabs
        tabs={tabData}
        defaultActiveTab={defaultIndex}
        onAfterChange={(e, idx) => {
          const url = new URL(window.location); // 获取当前页面的完整 URL
          url.searchParams.set("tab", l[idx]); // 设置或更新 'tab' 参数
          navigate(url.pathname + url.search); // 导航到新的 URL
        }}
      >
        <DeviceList></DeviceList>
        <BatchInfo UbDetail={UbDetail}></BatchInfo>
      </Tabs>
    </>
  );
}
function DeviceList() {}
function BatchInfo({ UbDetail }) {

    return (<>
    <div>批次信息</div>
    <Cell.Group>
        <Cell label="所属产品" text={UbDetail.id}></Cell>
        <Cell label="固件版本" text={UbDetail.id}></Cell>
        <Cell label="升级范围" text={UbDetail.type === 1?"批量升级":"定向升级"}></Cell>
        <Cell label="升级时间" text={UbDetail.startTime}></Cell>
    </Cell.Group>
    </>)
}
