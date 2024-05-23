import { Cell, Button } from "@arco-design/mobile-react";
import { ProductContext } from "@/context/Product";
import { useContext, useState } from "react";
import {
  Divider,
  Input,
  Picker,
  Radio,
  Textarea,
} from "@arco-design/mobile-react";
import MyRadio from "@/pages/Product/components/Radio";
import GetTime from "@/components/function/time";
export default function ProductInfos({}) {
  const { currentProduct, productList } = useContext(ProductContext);

  //* 需要一个record来记录之前的内容
  const [record, setRecord] = useState({});
  const keys = ["名称", "类型", "描述"];
  const keysInEng = ["name", "type", "description"];
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
  // <Info
  //       updateContent={UpdateChildren}
  //       keys={keys}
  //       keysInEng={keysInEng}
  //       requiredIdx={[0]}
  //       info={data}
  //       handleChange={handleChangeProduct}
  //       handleDelete={() => {
  //         handleNavigate(data.id);
  //         setCurrentProduct(data);
  //       }}
  //       record={record}
  //       setRecord={setRecord}
  //       content2={"产品详情"}
  //     >
  //       <td>{data.name}</td>
  //       <td>{data.description}</td>
  //     </Info>
  const UpdateChildren = (
    <>
      <Input
        label={keys[0] + ":"}
        required
        onChange={(e) => {
          setRecord({ ...record, name: e.target.value });
        }}
        defaultValue={record.name}
      ></Input>
      <div>
        <div>类型:</div>
        <MyRadio record={record} setRecord={setRecord}></MyRadio>
      </div>
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
    </>
  );
  let eles = Object.keys(showInfo).map((e, idx) => {
    return (
      <Cell key={idx} label={showInfo[e]}>
        {temp[e]}
      </Cell>
    );
  });

  return (
    <Cell.Group>
      {eles}
      <Button>修改信息</Button>
    </Cell.Group>
  );
}
