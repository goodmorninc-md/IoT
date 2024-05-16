import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import MyPopover from "@/components/Popover/Popover";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { Button, Cell, Input, Radio, Tabs } from "@arco-design/mobile-react";
import { CreateOrganization } from "@/services/Organization";
import { GetProductListByOrg } from "@/services/Product";
import { PopupSwiper, Popup } from "@arco-design/mobile-react";
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
import { useNavigate } from "react-router-dom";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";
export default function Device() {
  const { currentProduct, setCurrentProduct } = useContext(ProductContext);
  const { current_Organization } = useContext(OrganizationContext);
  const [deviceList, setDeviceList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [visible, setVisible] = useState(false);

  const tabData = [
    { title: "状态监测" },
    { title: "历史数据" },
    { title: "数据处理" },
  ];
  return (
    <>
      <MyTopBar LeftChildren={<InfoDrawer></InfoDrawer>}></MyTopBar>
      <Tabs
        tabs={tabData}
        type="card"
        onChange={(tab, index) => {
          console.log("[tabs]", tab, index);
        }}
      >
        <Status></Status>
        <></>
        <DataAnalyse></DataAnalyse>
      </Tabs>
      <MyTabBar activeIndex={3}></MyTabBar>
    </>
  );
}

function Status({}) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>选择</Button>
    </>
  );
}
function DataAnalyse({}) {
  const [visible, setVisible] = useState(false);
  const [addData, setAddData] = useState({});
  function handleConfirm() {}
  return (
    <>
      <Button onClick={() => setVisible(!visible)}>新增</Button>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        <Input
          label="描述"
          placeholder="请输入描述"
          onChange={(e) => {
            setAddData({ ...addData, description: e.target.value });
          }}
        ></Input>
        <Cell label="类型">
          <Radio.Group
            layout="inline"
            defaultValue={0}
            onChange={(e) => setAddData({})}

          >
            <Radio value={0}>流式</Radio>
            <Radio value={1}>批处理</Radio>
          </Radio.Group>
        </Cell>
        <Button onClick={() => handleConfirm}>确认添加</Button>
      </PopupSwiper>
    </>
  );
}
