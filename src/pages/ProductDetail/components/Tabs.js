import { Tabs } from "@arco-design/mobile-react";
import { createContext, useEffect, useState } from "react";
import ProductInfo from "./ProductInfo";
import ThingModel from "./ThingModel";
import Mapping from "./mapping";
import Point from "./point";
import Custormer from "./custormer";
import Diagram from "./diagram";
import { useNavigate, useLocation } from "react-router-dom";
import Firmware from "./firmware";

export default function Tab({ tabLabel, defaultActiveTab = 0, productId }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const query = new URLSearchParams(useLocation().search);
  const t = [
    "detail",
    "specification",
    "mapping",
    "point",
    "diagram",
    "firmware",
    "custormer",
  ];
  const tab = query.get("tab");
  useEffect(() => {
    if (t.indexOf(tab) !== -1) setActiveIndex(t.indexOf(tab));
  }, []);
  const navigate = useNavigate();

  return (
    <Tabs
      tabs={tabLabel}
      type="line"
      tabBarPadding={16}
      onAfterChange={(tab, index) => {
        navigate(`/product/${productId}?tab=${t[index]}`);
        setActiveIndex(index);
      }}
      swipeEnergySaving={true}
      defaultActiveTab={defaultActiveTab}
    >
      <ProductInfo
        activeIndex={activeIndex}
        style={{ marginTop: "0.2rem" }}
      ></ProductInfo>
      <ThingModel activeIndex={activeIndex}></ThingModel>
      <Mapping activeIndex={activeIndex}></Mapping>
      <Point activeIndex={activeIndex}></Point>
      <Diagram activeIndex={activeIndex}></Diagram>
      <Firmware activeIndex={activeIndex}></Firmware>
      <Custormer activeIndex={activeIndex}></Custormer>
    </Tabs>
  );
}
