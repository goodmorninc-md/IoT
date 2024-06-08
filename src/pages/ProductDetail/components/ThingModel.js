import {
  Button,
  Cell,
  SearchBar,
  Input,
  Textarea,
  LoadMore,
  Pagination,
} from "@arco-design/mobile-react";
import { ProductContext } from "@/context/Product";
import { useContext, useEffect, useRef, useState } from "react";
import { UpdateOneProduct } from "@/services/Product";
// import Uploader from "./uploader";
import Info from "@/components/PopupSwiper/Update";
import CellNodata from "@/components/InfoList/lackData";
import MyToast from "@/components/Toast/toast";

export default function ProductInfos({ activeIndex }) {
  const { currentProduct, setCurrentProduct, productList } =
    useContext(ProductContext);

  // const [searchText, setSearchText] = useState("");
  const [searchContent, setSearchContent] = useState({ ...currentProduct });
  const Trs = activeIndex === 1 && (
    <VaraibleList
      currentProduct={currentProduct}
      setCurrentProduct={setCurrentProduct}
      searchContent={searchContent}
      setSearchContent={setSearchContent}
      // searchText={searchText}
    ></VaraibleList>
  );
  return (
    <Cell.Group>
      {/* <Uploader></Uploader> */}
      {/* <Search
        currentProduct={currentProduct}
        searchContent={searchContent}
        setSearchContent={setSearchContent}
        searchText={searchText}
        setSearchText={setSearchText}
      /> */}
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>名称</th>
            <th>标识符</th>
          </tr>
        </thead>
        <tbody>{Trs}</tbody>
      </table>
    </Cell.Group>
  );
}

//* Infos list
function VaraibleList({
  currentProduct,
  setCurrentProduct,
  searchContent,
  setSearchContent,
  // searchText,
}) {
  //* record记录的是specification的内容
  const [record, setRecord] = useState({});
  const [currentVariable, setCurrentVariable] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const loadMoreRef = useRef(null);
  const [showList, setShowList] = useState([]);
  const showMore = useRef(0);
  // if (Object.keys(searchContent).length === 0) return <CellNodata></CellNodata>;
  const pageSize = 10;
  //* 每个变量的详细值列表
  useEffect(() => {
    if (searchContent.specification.length > pageSize)
      showMore.current += pageSize;
    setShowList(searchContent.specification.slice(0, pageSize));
  }, []);
  // useEffect(() => {
  //   // console.log("none");
  //   // console.log(searchContent.specification.slice(0, pageSize).length);
  //   setShowList(searchContent.specification.slice(0, pageSize));
  //   showMore.current = 0;
  //   console.log(showMore.current);
  //   // loadMoreRef.current.changeStatus("prepare", "scrollEnd");
  // }, [searchText]);
  let flag = false;
  if (showList.length === 0) flag = true;

  function checkRequire() {
    if (
      "specification" in record &&
      "dataType" in record.specification &&
      "specs" in record.specification &&
      "min" in record.specification.dataType.specs &&
      "max" in record.specification.dataType.specs
    ) {
      if (
        record.specification.dataType.specs.min >=
        record.specification.dataType.specs.max
      )
        return false;
      return true;
    }
    return true;
  }
  function handleChange() {
    if (checkRequire()) {
      // console.log(currentVariable);
      UpdateOneProduct(currentProduct.id, record)
        .then((data) => {
          let newSpecification = currentProduct.specification.map(
            (value, index) => {
              if (index === currentVariable) return record;
              else return value;
            }
          );
          setCurrentProduct({
            ...currentProduct,
            specification: newSpecification,
          });
          newSpecification = searchContent.specification.map((value, index) => {
            if (index === currentVariable) console.log("===", record);
            if (index === currentVariable) return record;
            else return value;
          });
          setSearchContent({
            ...searchContent,
            specification: newSpecification,
          });
          newSpecification = showList.map((value, index) => {
            if (index === currentVariable) console.log("===", record);
            if (index === currentVariable) return record;
            else return value;
          });
          setShowList([...newSpecification]);
          MyToast("success", "修改成功");
        })
        .catch((error) => {
          MyToast("error", "更新失败");
        });
    }
  }
  function handleDelete() {
    //* 这里应该是修改物编量
    UpdateOneProduct(currentProduct.id)
      .then((data) => {
        let newSpecification = currentProduct.specification.filter(
          (value, index) => {
            return index !== currentVariable;
          }
        );
        setCurrentProduct({
          ...currentProduct,
          specification: newSpecification,
        });
        newSpecification = searchContent.specification.filter((value, idx) => {
          return idx !== currentVariable;
        });
        setSearchContent({ ...searchContent, specification: newSpecification });
      })
      .catch((error) => {
        MyToast("error", "更新失败");
      });
  }

  const valuesMap = showList.map((data, idx) => {
    //* 定制详细信息,data是每一个变量
    const infosEle = infosEles(record);
    const UpdateChild = UpdateChildren(data, record, setRecord);
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
  function getData(callback) {
    // console.log("getData");
    // console.log(showList.length, searchContent.specification.length);
    setTimeout(() => {
      if (showMore.current <= searchContent.specification.length) {
        setShowList(
          searchContent.specification.slice(
            0,
            currentPage * pageSize + pageSize
          )
        );
        setCurrentPage(currentPage + 1);
        showMore.current += 10;
        callback("prepare");
      } else {
        // console.log(showMore.current);
        callback("nomore");
      }
    }, 1000);
  }
  return (
    <>
      {flag ? <CellNodata></CellNodata> : valuesMap}
      <LoadMore
        ref={loadMoreRef}
        style={{ paddingTop: 16, paddingBottom: 44 }}
        getData={getData}
        threshold={0}
        onStatusChange={(st, scene) => {
          // console.log("change", st, scene);
        }}
        changeStatus={(e) => {
          console.log(e);
        }}
      />
      {/* <Pagination
        current={currentPage}
        total={currentProduct.specification.length}
        icon
        onChange={({ current }) => setCurrentPage(current)}
      /> */}
    </>
  );
}
//*弹窗中的信息
const infosEles = (info) => {
  if (Object.keys(info).length === 0) return <CellNodata></CellNodata>;
  const dataType = info.dataType.type;
  const specs = info.dataType.specs;
  const info1 = (
    <>
      <Cell label="变量名" text={info.name} bordered={false}></Cell>
      <Cell label="标识符" text={info.variable} bordered={false}></Cell>
      <Cell label="数据类型" text={dataType} bordered={false}></Cell>
      <Cell label="精度" text={specs.precision} bordered={false}></Cell>
    </>
  );
  const specsEle = (
    <>
      <Cell label="取值范围" bordered={false}>
        <span>{specs.min}</span> - <span>{specs.max}</span>
      </Cell>
      <Cell label="单位" bordered={false}>
        <span>{specs.unit}</span> <span>{specs.unitName}</span>
      </Cell>
    </>
  );
  const des = (
    <Textarea
      disabled
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
//* 更新的框
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
  if (Object.keys(record).length === 0) return <></>;
  const specs = record.dataType.specs;
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
        defaultValue={
          specs.precision !== undefined ? specs.precision.toString() : ""
        }
        onChange={(e) => setRecord({ ...record, precision: e.target.value })}
      ></Input>
      <Cell label={keys[4]} style={{ height: "auto" }}>
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
        ></Input>
        <span>——</span>
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
      </Cell>
      <Cell label={keys[5]}>
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
        <span>——</span>
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
    </>
  );
};

// function Search({
//   currentProduct,
//   searchContent,
//   setSearchContent,
//   setSearchText,
//   searchText,
// }) {
//   const searchRef = useRef();
//   const handleSearchChange = (e) => {
//     setSearchText(e.target.value);
//     if (e.target.value.length === 0) {
//       console.log("setSearchContent({ ...currentProduct })");
//       return setSearchContent({ ...currentProduct });
//     }
//     let newSpecification = currentProduct.specification.filter((value) => {
//       return value.name.indexOf(e.target.value) !== -1;
//     });
//     setSearchContent({ ...searchContent, specification: newSpecification });
//   };
//   function handleCancel(e) {
//     setSearchContent({ ...currentProduct });
//     setSearchText("");
//   }
//   return (
//     <SearchBar
//       shape="square"
//       textAlign="center"
//       onChange={handleSearchChange}
//       onCancel={handleCancel}
//       onClear={handleCancel}
//       ref={searchRef}
//       value={searchText}
//     />
//   );
// }
