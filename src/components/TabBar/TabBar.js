import { useState } from "react";
import { TabBar } from "@arco-design/mobile-react";
import {
  IconHome,
  IconUser,
  IconNotice,
  IconSetting,
} from "@arco-design/mobile-react/esm/icon";
import "@/styles/tabBar.less";
import { useNavigate } from "react-router-dom";
export default function MyTabBar({ activeIndex = 0, children }) {
  const navigate = useNavigate();
  const tabs = [
    {
      title: "首页",
      icon: <IconHome />,
      url: "/",
    },
    {
      title: "产品",
      icon: <IconUser />,
      url: "/product",
    },
    {
      title: "设备",
      icon: <IconNotice />,
      url: "/",
    },
    {
      title: "监控",
      icon: <IconSetting />,
      url: "/",
    },
    {
      title: "告警",
      url: "/",
    },
  ];
  return (
    <>
      <TabBar
        fixed={true}
        className="tabBar"
        onChange={(index) => {}}
        activeIndex={activeIndex}
      >
        {tabs.map((tab, index) => {
          // console.log(tab,index)
          return (
            <TabBar.Item
              title={tab.title}
              icon={tab.icon}
              key={index}
              onClick={() => {
                navigate(tab.url);
              }}
            />
          );
        })}
      </TabBar>
    </>
  );
}
