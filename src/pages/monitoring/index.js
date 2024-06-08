import MyTopBar from "@/components/TopBar/TopBar";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { Tabs } from "@arco-design/mobile-react";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";

import HistoryData from "./components/history";
import DataAnalyse from "./components/datarule";
import Status from "./components/statis";
export default function Device() {
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
    </div>
  );
}
