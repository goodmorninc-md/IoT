import { useState } from "react";
import { TabBar } from "@arco-design/mobile-react";
import {
  IconHome,
  IconUser,
  IconNotice,
  IconSetting,
} from "@arco-design/mobile-react/esm/icon";
import {ReactComponent as IconAlert} from "@/assets/icon/alert.svg"
import {ReactComponent as IconProduction} from "@/assets/icon/productTabBar.svg"
import {ReactComponent as IconDevice} from "@/assets/icon/device.svg"
import {ReactComponent as IconCCTV} from "@/assets/icon/cctv.svg"
import "@/styles/tabBar.less";
import { useNavigate } from "react-router-dom";
export default function MyTabBar({ activeIndex = 0, children }) {
  const navigate = useNavigate();
  const tabs = [
    {
      title: "首页",
      icon: <IconHome className="icon-tab-bar"/>,
      url: "/",
    },
    {
      title: "产品",
      icon: <IconProduction className="icon-tab-bar"/>,
      url: "/product",
    },
    {
      title: "设备",
      icon: <IconDevice className="icon-tab-bar"/>,
      url: "/device",
    },
    {
      title: "监控",
      icon: <IconCCTV className="icon-tab-bar"/>,
      url: "/monitoring",
    },
    {
      icon:<IconAlert className="icon-tab-bar" />,
      title: "告警",
      url: "/alert",
    },
  ];
  return (
    <>
      <TabBar
        fixed={true}
        className="tabBar"
        activeIndex={activeIndex}
        activeCustomStyle={{
          color: '#1890ff',
        }}
      >
        {tabs.map((tab, index) => {
          return (
            <TabBar.Item
              title={tab.title}
              icon={tab.icon}
              key={index}
              activeCustomStyle="active-style"
              onClick={() => {
                console.log(tab.url)
                navigate(tab.url);
              }}
            />
          );
        })}
      </TabBar>
    </>
  );
}
