import { Tabs } from "@arco-design/mobile-react";

export default function MyTabs({ handleChange,tabData,children }) {

  return (
    <Tabs
      tabs={tabData}
      defaultActiveTab={0}
      tabBarHasDivider={false}
      useCaterpillar
      underlineSize={6}
      underlineThick={6}
      caterpillarMaxScale={6}
      underlineInnerStyle={{ borderRadius: 6 }}
      caterpillarProperty="size"
      tabBarPadding={22}
      onAfterChange={(tab, index) => {
        handleChange(index)
      }}
      tabBarArrange="start"
      style={{color: "black",
        fontSize: 0.5}}
    >
      {children}
      {children}
    </Tabs>
  );
}
