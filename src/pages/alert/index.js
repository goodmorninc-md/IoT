import MyTopBar from "@/components/TopBar/TopBar";
import { useState, useContext, useRef, useEffect } from "react";

import { Tabs, DatePicker } from "@arco-design/mobile-react";

import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";
import Incident from "./component/incident";
import AlertRule from "./component/alertrule";
import Espolicy from "./component/espolicy";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";
import { OrganizationContext } from "@/context/Organization";
export default function Device({ activeIndex }) {
  const [index, setIndex] = useState(0);
  const tabData = [{ title: "告警事件" }, { title: "告警规则" }];
  const {current_Organization } = useContext(OrganizationContext)
  return (
    <div className="Not-cover">
      <MyTopBar
        LeftChildren={<InfoDrawer activeIndex={activeIndex}></InfoDrawer>}
        content={current_Organization.name}
      ></MyTopBar>
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
      {/* <MyTabBar activeIndex={4}></MyTabBar> */}
    </div>
  );
}
