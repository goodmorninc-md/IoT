import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";

import { ShowDetailOfUB } from "@/services/upgradeBatch";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Product from "@/services/Product";
import * as Firmware from "@/services/firmware";
import * as Device from "@/services/device";
import ReturnButton from "@/components/TopBar/return";
import InfoList from "@/components/InfoList/infoList";

export default function UpgradedetailDetail() {
  const { currentProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const url = window.location.href;
  const query = new URLSearchParams(location.search);
  const { productId, firmwareId, upgradeBatchId } = useParams();
  //* 不存在则为null
  const paramTab = query.get("tab");

  const [UbDetail, setUbDetail] = useState({});
  useEffect(() => {
    ShowDetailOfUB(productId, upgradeBatchId).then((data) => {
      setUbDetail(data);
    }).catch(error=>{
      MyToast("error","获取更新详情失败")
    });
  }, []);
  const tabData = [{ title: "设备列表" }, { title: "批次信息" }];
  const l = ["device", "batch"];
  let defaultIndex = l.indexOf(paramTab) !== -1 ? l.indexOf(paramTab) : 0;
  return (
    <>
      <MyTopBar
        LeftChildren={
          <ReturnButton
            navigate={() =>
              navigate(`/product/${productId}/firmware/${firmwareId}`)
            }
          ></ReturnButton>
        }
        content={currentProduct.name}
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
function DeviceList() {
  const { productId, firmwareId, upgradeBatchId } = useParams();
  const [deviceList, setDeviceList] = useState([]);
  useEffect(() => {
    Device.GetDiviceUpgraedeList()
      .then((data) => {
        setDeviceList(data);
      })
      .catch((error) => {
        MyToast("error","获取更新列表失败");
      });
  }, []);
  let child = deviceList.map((data, idx) => {
    return (
      <Fragment key={idx}>
        <tr>
          <td>
            <span className="tr-text">{data.name}</span>
          </td>
          <td>
            <span className="tr-text">{data.description}</span>
          </td>
        </tr>
      </Fragment>
    );
  });
  return (
    <table className="table">
      <thead className="TrTable">
        <tr>
          <th>描述</th>
          <th>类型</th>
        </tr>
      </thead>
      <tbody>{child}</tbody>
    </table>
  );
}
function BatchInfo({ UbDetail }) {
  const { productId, firmwareId, upgradeBatchId } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentFirmware, setCurrentFirmware] = useState({});
  useEffect(() => {
    Product.GetOneProduct(productId).then((data) => {
      setCurrentProduct(data);
    }).catch(error=>{
      MyToast("error","获取产品详情失败")
    });
    Firmware.ShowDetailOfFirmware(productId, firmwareId).then((data) => {
      setCurrentFirmware(data);
    }).catch(error=>{
      MyToast("error","获取固件详情失败")
    });
  }, []);
  return (
    <>
      <div className="popup-title">批次信息</div>
      <Cell.Group>
        <Cell
          label="所属产品"
          text={currentProduct.name}
          bordered={false}
        ></Cell>
        <Cell
          label="固件版本"
          text={currentFirmware.version}
          bordered={false}
        ></Cell>
        <Cell
          label="升级范围"
          text={UbDetail.type === 1 ? "批量升级" : "定向升级"}
          bordered={false}
        ></Cell>
        <Cell
          label="升级时间"
          text={UbDetail.startTime}
          bordered={false}
        ></Cell>
      </Cell.Group>
    </>
  );
}
