import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import {
  Button,
  Cell,
  Input,
  Tabs,
  DatePicker,
} from "@arco-design/mobile-react";
import { CreateOrganization } from "@/services/Organization";
import { GetProductListByOrg } from "@/services/Product";
import { PopupSwiper } from "@arco-design/mobile-react";

import MyToast from "@/components/Toast/toast";
import MyDropDown from "@/components/Dropdown/dropdown";
import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";
import Incident from "./component/incident";
import AlertRule from "./component/alertrule";
import Espolicy from "./component/espolicy";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";
export default function Device() {
  const { currentProduct, setCurrentProduct } = useContext(ProductContext);
  const { current_Organization } = useContext(OrganizationContext);
  const [deviceList, setDeviceList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const tabData = [{ title: "告警事件" }, { title: "告警规则" }];

  return (
    <>
      <MyTopBar LeftChildren={<InfoDrawer></InfoDrawer>}></MyTopBar>
      <Tabs
        // ref={e=>{
        //   console.log(e)
        //   console.log(e.pane)
        // }}
        tabs={tabData}
        type="card"
        tabBarClass="alert-tabs"
        // autoHeight
        onChange={(tab, index) => {
          console.log("[tabs]", tab, index);
          setIndex(index);
        }}
      >
        <Incident currentTab={index}></Incident>
        <AlertRule></AlertRule>
      </Tabs>
      <MyTabBar activeIndex={4}></MyTabBar>
    </>
  );
}
