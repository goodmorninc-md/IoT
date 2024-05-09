import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  ListAllMapofProd,
  CreateMapping,
  ShowDetailsOfMap,
  updateMapping,
  RemoveMapping,
  TestAMapping,
} from "@/services/mapping";
import { Button, Input, Textarea } from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
export default function Mapping() {
  const { currentProduct } =
    useContext(ProductContext);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const myParam = query.get("mapping");
  console.log(myParam);

  //* 根据选择不同的数据类型显示不同的元素
  const [buttonEditStatus, setEditStatus] = useState(false);
  const [mapEditStatus, setMapEditStatus] = useState(false);
  //* currentMap代表当前map的id
  const [currentMap, setCurrentMap] = useState(myParam === null ? "" : myParam);

  return (
    <>
      <MyTopBar></MyTopBar>
      <CrtEditMappingJsx
        productId={currentProduct.id}
        currentMap={currentMap}
        setCurrentMap={setCurrentMap}
        mapEditStatus={mapEditStatus}
        buttonEditStatus={buttonEditStatus}
        setEditStatus={setEditStatus}
        setMapEditStatus={setMapEditStatus}
      ></CrtEditMappingJsx>
    </>
  );
}

//* 创建/编辑映射元素
function CrtEditMappingJsx({ productId, currentMap = "", setCurrentMap }) {
  const [record, setRecord] = useState({});
  const navigate = useNavigate();
  //* 这里编辑页面看不到数据修改是因为这里有修改了，所以这里连上后端就没问题
  //* 新建的编辑不了也是同理
  useEffect(() => {
    if (currentMap !== "") {
      ShowDetailsOfMap(productId, currentMap).then((data) => {
        setRecord({ ...data });
      });
    }
  }, []);

  let chooseTypeEle = <></>;
  //* 根据选择的数据类型展示不同的框
  if ("type" in record) {
    chooseTypeEle =
      record.type === 2 ? (
        <Input
          label={"前缀"}
          defaultValue={record.prefix}
          onChange={(e) => {
            setRecord({ ...record, mapping: e.target.value });
          }}
        ></Input>
      ) : (
        <Textarea
          label="映射"
          required
          prefix="Message"
          statisticsMaxlength={50}
          autosize
          placeholder="Please enter the map"
          border="all"
          rows={2}
          renderStatistics={(cur, max) => `${cur}/${max}`}
          onChange={(e) => setRecord({ ...record, mapping: e.target.value })}
        ></Textarea>
      );
  }
  let element = <></>;
  //* 是否处于新建状态
  if (currentMap === "") {
    element = (
      <>
        <Input
          label="名称"
          defaultValue=""
          required
          onChange={(e) => {
            setRecord({ ...record, name: e.target.value });
          }}
        ></Input>
        <Dropdown record={record} setRecord={setRecord} />
        <Textarea
          label="描述"
          prefix="Message"
          statisticsMaxlength={50}
          autosize
          placeholder="Please enter the description"
          border="all"
          rows={2}
          renderStatistics={(cur, max) => `${cur}/${max}`}
          onChange={(e) => {
            setRecord({ ...record, name: e.target.value });
          }}
        ></Textarea>
        {chooseTypeEle}
      </>
    );
  } else {
    element = (
      <>
        <Input
          label="名称"
          value={record.name}
          required
          onChange={(e) => {
            setRecord({ ...record, name: e.target.value });
          }}
        ></Input>
        <Dropdown record={record} setRecord={setRecord} />
        <Textarea
          label="描述"
          prefix="Message"
          statisticsMaxlength={50}
          autosize
          placeholder="Please enter the description"
          border="all"
          rows={2}
          renderStatistics={(cur, max) => `${cur}/${max}`}
          value={record.description}
          onChange={(e) => {
            setRecord({ ...record, description: e.target.value });
          }}
        ></Textarea>
        {chooseTypeEle}
      </>
    );
  }
  //* 保存更改，发起请求
  function handleSave() {
    if (currentMap !== "") {
      updateMapping(productId, record.id, record).then((res) => {
        MyToast("success", "保存成功");
      });
      navigate(`/product/${productId}/`);
    } else {
      console.log(213);
      CreateMapping(productId, record).then((res) => {
        MyToast("success", "保存成功");
        console.log(res);
      });
      navigate(`/product/${productId}?tab=mapping`);
    }
  }
  function handleBack() {
    navigate(`/product/${productId}?tab=mapping`);
  }
  return (
    <>
      {element}
      <Button onClick={handleSave}>保存</Button>
      <Button onClick={handleBack}>返回</Button>
    </>
  );
}

function Dropdown({ record, setRecord }) {
  const handleDropDownClick = (e) => {
    setRecord({ ...record, type: e });
  };
  const dropdownELements = [
    { id: 1, name: "Binary" },
    { id: 2, name: "JSON" },
  ];
  const initialValue =
    "type" in record
      ? dropdownELements[record.type - 1].name
      : "请选择设备数据类型";
  return (
    <MyDropDown
      label="数据类型"
      DropDownOnClick={handleDropDownClick}
      initialValue={initialValue}
      DropDownElements={dropdownELements}
    ></MyDropDown>
  );
}
