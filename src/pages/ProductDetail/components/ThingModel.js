import {
  Button,
  Cell,
  SearchBar,
  Input,
  Textarea,
  Tabs,
} from "@arco-design/mobile-react";
import { ProductContext } from "@/context/Product";
import { useContext, useEffect, useState } from "react";
import {
  DelOneProduct,
  GetOneProduct,
  GetProductListByOrg,
  UpdateOneProduct,
} from "@/services/Product";
import Uploader from "./uploader";
import Info from "@/components/PopupSwiper/Update";

export default function ProductInfos({}) {
  const { currentProduct, setCurrentProduct, productList } =
    useContext(ProductContext);

  const [searchText, setSearchText] = useState("");
  const [searchContent, setSearchContent] = useState({ ...currentProduct });
  const [editStatus, setEditStatus] = useState(false);

  const EditButton = <Button>编辑</Button>;

  const Trs = VaraibleList(
    currentProduct,
    setCurrentProduct,
    searchContent,
    setSearchContent
  );
  return (
    <Cell.Group>
      <Uploader></Uploader>
      <Search
        currentProduct={currentProduct}
        searchContent={searchContent}
        setSearchContent={setSearchContent}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>名称</th>
            <th>标识符</th>
          </tr>
        </thead>
        <tbody>{Trs}</tbody>
      </table>

      {EditButton}
    </Cell.Group>
  );
}
function Search({
  currentProduct,
  searchContent,
  setSearchContent,
  setSearchText,
}) {
  const handleSearchChange = (e) => {
    let newSpecification = currentProduct.specification.filter((value) => {
      return value.name.indexOf(e.target.value) !== -1;
    });
    setSearchContent({ ...searchContent, specification: newSpecification });
    setSearchText(e.target.value);
  };
  return (
    <SearchBar
      shape="square"
      textAlign="center"
      onChange={handleSearchChange}
    />
  );
}

//* Infos list
function VaraibleList(
  currentProduct,
  setCurrentProduct,
  searchContent,
  setSearchContent,
  searchText
) {
  //* record记录的是specification的内容
  const [record, setRecord] = useState({});
  const [currentVariable, setCurrentVariable] = useState(0);

  //* 每个变量的详细值列表
  const specification =
    searchContent.specification !== undefined
      ? searchContent.specification
      : [];
  function handleChange() {
    console.log(record);
    UpdateOneProduct(currentProduct.id, record).then((data) => {
      console.log(data);
      console.log("currentVariable", currentVariable);
      let newSpecification = specification.map((value, index) => {
        if (index === currentVariable) return record;
        else return value;
      });
      console.log(newSpecification);
      setCurrentProduct({
        ...currentProduct,
        specification: newSpecification,
      });
      newSpecification = currentProduct.specification.filter((value) => {
        return value.name.indexOf(searchText) !== -1;
      });
      setSearchContent({ ...searchContent, specification: newSpecification });
    });
  }
  function handleDelete() {
    //* 这里应该是修改物编量
    UpdateOneProduct(currentProduct.id).then((data) => {
      let newSpecification = specification.filter((value, index) => {
        return index !== currentVariable;
      });
      setCurrentProduct({
        ...currentProduct,
        specification: newSpecification,
      });
      newSpecification = currentProduct.specification.filter((value) => {
        return value.name.indexOf(searchText) !== -1;
      });
      setSearchContent({ ...searchContent, specification: newSpecification });
    });
  }

  const valuesMap = specification.map((data, idx) => {
    //* 定制详细信息,data是每一个变量
    const infosEle = infosEles(data);
    const UpdateChild = UpdateChildren(data, record, setRecord);
    // console.log(data);
    //* info传入的是specification的值
    return (
      <Info
        updateContent={UpdateChild}
        info={data}
        record={record}
        setRecord={setRecord}
        content1={"修改变量"}
        content2={"删除变量"}
        handleChange={handleChange}
        handleDelete={handleDelete}
        infosEles={infosEle}
        setCurrentVariable={setCurrentVariable}
        index={idx}
      >
        <td>{data.name}</td>
        <td>{data.variable}</td>
      </Info>
    );
  });

  return valuesMap;
}

const infosEles = (info) => {
  const dataType = info.dataType.type;
  const specs = info.dataType.specs;
  // console.log("specs", specs.precision);
  const info1 = (
    <>
      <Cell label="变量名" text={info.name}></Cell>
      <Cell label="标识符" text={info.variable}></Cell>
      <Cell label="数据类型" text={dataType}></Cell>
      <Cell label="精度" text={specs.precision}></Cell>
    </>
  );
  const specsEle = (
    <>
      <div>
        取值范围
        <span>{specs.min}</span> - <span>{specs.max}</span>
      </div>
      <div>
        单位
        <span>{specs.unit}</span> <span>{specs.unitName}</span>
      </div>
    </>
  );
  const des = (
    <Textarea
      prefix="Message"
      statisticsMaxlength={50}
      autosize
      placeholder="Please enter the description"
      border="all"
      rows={2}
      renderStatistics={(cur, max) => `${cur}/${max}`}
      label={"描述"}
      defaultValue={info.description}
    />
  );
  return (
    <>
      {info1}
      {specsEle}
      {des}
    </>
  );
};

const UpdateChildren = (data, record, setRecord) => {
  const keys = [
    "变量名",
    "标识符",
    "数据类型",
    "精度",
    "取值范围",
    "单位",
    "描述",
  ];
  // console.log("UpdateData", record);
  if (Object.keys(record).length === 0) return <></>;
  const specs = record.dataType.specs;
  const dataType = record.dataType.type;
  return (
    <>
      <Input
        label={keys[0]}
        required
        onChange={(e) => {
          setRecord({ ...record, name: e.target.value });
        }}
        defaultValue={record.name}
      ></Input>
      <Input label={keys[1]} defaultValue={record.variable} disabled></Input>

      <Input
        label={keys[2]}
        defaultValue={record.dataType.type}
        disabled
      ></Input>

      <Input
        label={keys[3]}
        defaultValue={specs.precision.toString()}
        onChange={(e) => setRecord({ ...record, precision: e.target.value })}
      ></Input>
      <div>
        <span>{keys[4]}</span>
        <Input
          defaultValue={specs.min}
          onChange={(e) =>
            setRecord({
              ...record,
              dataType: {
                ...record.dataType,
                specs: { ...record.dataType.specs, min: e.target.value },
              },
            })
          }
          append={
            specs.min < specs.max ? <></> : <div>最小值必须大于最大值</div>
          }
        ></Input>
        <span>-</span>
        <Input
          defaultValue={specs.max}
          onChange={(e) =>
            setRecord({
              ...record,
              dataType: {
                ...record.dataType,
                specs: { ...record.dataType.specs, max: e.target.value },
              },
            })
          }
        ></Input>
      </div>
      <div>
        <span>{keys[5]}</span>
        <Input
          defaultValue={specs.unit}
          onChange={(e) =>
            setRecord({
              ...record,
              dataType: {
                ...record.dataType,
                specs: { ...record.dataType.specs, unit: e.target.value },
              },
            })
          }
        ></Input>
        <span>-</span>
        <Input
          defaultValue={specs.unitName}
          onChange={(e) =>
            setRecord({
              ...record,
              dataType: {
                ...record.dataType,
                specs: { ...record.dataType.specs, unitName: e.target.value },
              },
            })
          }
        ></Input>
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
};
