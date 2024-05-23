import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import MyPopover from "@/components/Popover/Popover";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import {
  Button,
  Cell,
  Input,
  Radio,
  Tabs,
  Textarea,
} from "@arco-design/mobile-react";
import { CreateOrganization } from "@/services/Organization";
import { GetProductListByOrg } from "@/services/Product";
import { PopupSwiper, Popup } from "@arco-design/mobile-react";
import * as DataRule from "@/services/datarule";

import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";

import HistoryData from "./components/history";
import DataAnalyse from "./components/datarule";
import Status from "./components/statis";
import MyToast from "@/components/Toast/toast";
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
    <div className="Not-cover">
      <MyTopBar LeftChildren={<InfoDrawer></InfoDrawer>}></MyTopBar>
      <Tabs
        tabs={tabData}
        type="card"
        onChange={(tab, index) => {
          console.log("[tabs]", tab, index);
        }}
        swipeable={false}
      >
        <Status></Status>
        <HistoryData></HistoryData>
        <DataAnalyse></DataAnalyse>
      </Tabs>
      {/* <div >213</div> */}
      <MyTabBar activeIndex={3}></MyTabBar>
    </div>
  );
}
