import { Cell, Button } from "@arco-design/mobile-react";
import { ProductContext } from "@/context/Product";
import { useContext, useState } from "react";
import {
  Divider,
  Input,
  Picker,
  Radio,
  Textarea,
  PopupSwiper,
  Tabs,
} from "@arco-design/mobile-react";
import MyRadio from "@/pages/Product/components/Radio";
import GetTime from "@/components/function/time";
import { UpdateOneProduct } from "@/services/Product";
import MyToast from "@/components/Toast/toast";
export default function ProductInfos({}) {
  const { currentProduct, setCurrentProduct, productList } =
    useContext(ProductContext);
  const [visible, setVisible] = useState(false);
  //* 需要一个record来记录之前的内容
  const [record, setRecord] = useState({ ...currentProduct });
  const keys = ["名称", "类型", "描述"];
  const status = ["", "运营中", "已删除", "已停止"];
  const type = ["", "普通", "生产线"];
  const showInfo = {
    productKey: "productKey",
    productSecret: "productSecret",
    status: "状态",
    type: "类型",
    createdAt: "创建时间",
    description: "描述",
  };
  let temp = { ...currentProduct };
  temp.status = status[temp.status];
  temp.type = type[temp.type];
  temp.createdAt = GetTime(temp.createdAt);
  //* 更新信息
  function handleConfirm() {
    UpdateOneProduct(currentProduct.id, record).then((data) => {
      MyToast("success", "修改成功");
      setCurrentProduct(data);
      setVisible(!visible);
    }).catch(error=>{
      MyToast("error","更新失败")
    });
  }
  const tabData = [
    { title: "普通", value: 1 },
    { title: "生产线", value: 2 },
  ];
  const UpdateChildren = (
    <>
      <Input
        label={keys[0] + ":"}
        required
        onChange={(e) => {
          setRecord({ ...record, name: e.target.value });
        }}
        border="all"
        defaultValue={record.name}
      ></Input>
      <Cell label="类型">
        {/* <MyRadio record={record} setRecord={setRecord}></MyRadio> */}
        <Tabs
          tabs={tabData}
          onChange={(tab, index) => {
            // console.log("[tabs]", tab, index);
            setRecord({ ...record, type: tab.value });
          }}
          // disabled
          className="update-tabs"
          type="card"
        ></Tabs>
      </Cell>
      <Textarea
        prefix="Message"
        statisticsMaxlength={50}
        autosize
        placeholder="Please enter the description"
        border="all"
        rows={2}
        renderStatistics={(cur, max) => `${cur}/${max}`}
        label={"描述"}
        defaultValue={record.description}
        onChange={(e) => {
          setRecord({ ...record, description: e.target.value });
        }}
      />
      <Button onClick={handleConfirm}>确认修改</Button>
    </>
  );

  let eles = Object.keys(showInfo).map((e, idx) => {
    return (
      <Cell key={idx} label={showInfo[e]} bordered={false}>
        {temp[e]}
      </Cell>
    );
  });

  return (
    <Cell.Group>
      {eles}
      <Button onClick={() => setVisible(!visible)}>修改信息</Button>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
          setRecord({ ...currentProduct });
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        {UpdateChildren}
      </PopupSwiper>
    </Cell.Group>
  );
}
