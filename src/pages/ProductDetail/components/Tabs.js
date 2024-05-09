import { Tabs } from "@arco-design/mobile-react";
import { useState } from "react";
import ProductInfo from "./ProductInfo";
import ThingModel from "./ThingModel"
import Mapping from "./mapping";
import Point from "./point";
import Custormer from "./custormer";
import { useNavigate } from "react-router-dom";
import Firmware from "./firmware";
export default function Tab({ tabLabel,defaultActiveTab=0,productId }) {
  const [select, setSelect] = useState(0);
  const navigate = useNavigate()
  let elements = ProductInfo;
  let t = ["detail","specification","mapping","point","diagram","fireware","custormer"]
  return (
    <Tabs
      tabs={tabLabel}
      type="tag"
      tabBarPadding={16}
      onAfterChange={(tab, index) => {
        navigate(`/product/${productId}?tab=${t[index]}`)
      }}
      swipeEnergySaving={true}
      defaultActiveTab={defaultActiveTab}
    >
      <ProductInfo></ProductInfo>
      <ThingModel></ThingModel>
      <Mapping></Mapping>
      <Point></Point>
      <></>
      <Firmware></Firmware>
      <Custormer></Custormer>
    </Tabs>
  );
}
