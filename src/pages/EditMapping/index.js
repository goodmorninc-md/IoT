import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  CreateMapping,
  ShowDetailsOfMap,
  updateMapping,
} from "@/services/mapping";
import {
  Button,
  DropdownMenu,
  Input,
  Tabs,
  Textarea,
  Cell,
} from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as IconGetback } from "@/assets/icon/getBack.svg";
import { bgColor } from "@/styles/buttonColorConfig";
import MyPopover from "@/components/Popover/Popover";
import Occupancy from "@/components/function/occupancy";
export default function Mapping() {
  const { currentProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const myParam = query.get("mapping");

  //* 根据选择不同的数据类型显示不同的元素
  const [buttonEditStatus, setEditStatus] = useState(false);
  const [mapEditStatus, setMapEditStatus] = useState(false);
  //* currentMap代表当前map的id
  const [currentMap, setCurrentMap] = useState(myParam === null ? "" : myParam);
  console.log(currentProduct)
  return (
    <>
      <MyTopBar
        LeftChildren={
          <Button
            className="sideBar"
            icon={<IconGetback className="iconInfoFpage"></IconGetback>}
            onClick={() =>
              navigate(`/product/${currentProduct.id}?tab=mapping`)
            }
            bgColor={bgColor}
          ></Button>
        }
        content={currentProduct.name}
      ></MyTopBar>
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
  const [record, setRecord] = useState({ type: 1 });
  const navigate = useNavigate();
  //* 这里编辑页面看不到数据修改是因为这里有修改了，所以这里连上后端就没问题
  //* 新建的编辑不了也是同理
  //* currentMap是mapId
  useEffect(() => {
    if (currentMap !== "") {
      ShowDetailsOfMap(productId, currentMap).then((data) => {
        setRecord({ ...data });
      }).catch(error=>{
        MyToast("error","获取变量详情失败")
      });;
    }
  }, []);
  let chooseTypeEle = <></>;
  //* 根据选择的数据类型展示不同的框
  chooseTypeEle =
    record.type === 2 ? (
      <Input
        label={
          <span style={{ display: "flex" }}>
            <Occupancy />
            前缀
            <MyPopover content={"为所有变量标识符添加统一的前缀"}></MyPopover>
          </span>
        }
        defaultValue={record.prefix}
        placeholder="请输入标识符的前缀"
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
        placeholder="请输入映射"
        border="all"
        rows={2}
        renderStatistics={(cur, max) => `${cur}/${max}`}
        onChange={(e) => setRecord({ ...record, mapping: e.target.value })}
      ></Textarea>
    );
  let element = <></>;
  const tabData = [
    { title: "binary", value: 1 },
    { title: "JSON", value: 2 },
  ];
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
          placeholder="请输入名称"
        ></Input>
        <Cell
          label={
            <span>
              <span style={{ color: "red" }}>* </span>数据类型
            </span>
          }
        >
          <Tabs
            tabs={tabData}
            type="card"
            activeTab={record.type - 1}
            onChange={(value, idx) => {
              setRecord({ ...record, type: value.value });
            }}
          ></Tabs>
        </Cell>
        <Textarea
          label={
            <>
              <Occupancy />
              描述
            </>
          }
          prefix="Message"
          statisticsMaxlength={50}
          autosize
          placeholder="请输入描述"
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
        <Cell
          label={
            <span>
              <span style={{ color: "red" }}>* </span>数据类型
            </span>
          }
        >
          <Tabs
            tabs={tabData}
            type="card"
            activeTab={record.type - 1}
            onChange={(value, idx) => {
              setRecord({ ...record, type: value.value });
            }}
          ></Tabs>
        </Cell>
        {/* <Dropdown record={record} setRecord={setRecord} /> */}
        <Textarea
          label={
            <>
              <Occupancy />
              描述
            </>
          }
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
    if (checkRequire()) {
      if (currentMap !== "") {
        updateMapping(productId, record.id, record).then((res) => {
          MyToast("success", "保存成功");
        }).catch(error=>{
          MyToast("error","更新变量失败")
        });
      } else {
        CreateMapping(productId, record).then((res) => {
          MyToast("success", "创建成功");
        }).catch(error=>{
          MyToast("error","创建数据解析失败")
        });;
      }
      // setRecord({ type: 1 });
      navigate(`/product/${productId}?tab=mapping`);
    } else {
      MyToast("warn", "存在未填项");
    }
  }
  function handleBack() {
    // setRecord();
    navigate(`/product/${productId}?tab=mapping`);
  }
  function checkRequire() {
    if ("name" in record && "type" in record) {
      // 检查 record.name 是否为空字符串
      if (record.name.length > 0) {
        // 检查 type 是否为 1
        if (record.type === 1) {
          // 当 type 为 1 时，检查 record.mapping 是否为空字符串
          if ("mapping" in record && record.mapping.length > 0) {
            return true;
          } else {
            return false; // mapping 为空字符串时返回 false
          }
        } else {
          return true; // type 不为 1 时返回 true
        }
      } else {
        return false; // name 为空字符串时返回 false
      }
    } else {
      return false; // record 对象中不包含 name 或 type 属性时返回 false
    }
  }
  return (
    <>
      {element}
      <div className="twobutton-div">
        <Button onClick={handleSave} className="two-button-button">
          保存
        </Button>
        <Button onClick={handleBack} className="two-button-button">
          返回
        </Button>
      </div>
    </>
  );
}
