import MyTabs from "@/components/Tab/Tab";
import {useState } from "react";
import EditOrganization from "./Info";
import Custormer from "./User";
import { Tabs, Button, PopupSwiper } from "@arco-design/mobile-react";

export default function MyTab({ tabData, children }) {
  const [currentSelect, setCurrentSelect] = useState(0);

  function handleChange(e) {
    setCurrentSelect(e);
  }

  return (
    <>
      <div className="tabsControl">
        <Tabs
          tabs={tabData}
          defaultActiveTab={0}
          tabBarHasDivider={false}
          useCaterpillar
          underlineSize={50}
          underlineThick={6}
          caterpillarMaxScale={6}
          underlineInnerStyle={{ borderRadius: 6 }}
          caterpillarProperty="size"
          tabBarPadding={100}
          onAfterChange={(tab, index) => {
            handleChange(index);
          }}
          tabBarArrange="start"
          className="tabs arco-tab-cell"
          // style={{fontSize:100}}
        ></Tabs>
      </div>
      {currentSelect === 0 ? (
        <EditOrganization currentSelect={currentSelect}></EditOrganization>
      ) : (
        <Custormer currentSelect={currentSelect}></Custormer>
      )}
    </>
  );
}

// export default function Tabs({ tabData }) {
//   //* 使用state
//   const [currentSelect, setCurrentSelect] = useState(0);

//   //* 当current_organization发生变化时，请求数据
//   //? 从undefined变成初始化是否会触发渲染

//   function handleChange(e) {
//     setCurrentSelect(e);
//   }
//   //这里的问题是，当currentSelect变化，下述表达式会重新渲染，并且在Tab中，也会重新渲染，会输出两次，网络请求两次
//   return (
//     <MyTabs handleChange={handleChange} tabData={tabData}>
//       {currentSelect === 0 ? <EditOrganization></EditOrganization>:<Custormer></Custormer>}

//     </MyTabs>
//   );
// }
