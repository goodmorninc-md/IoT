import {
  Button,
  Cell,
  DatePicker,
  Input,
  Picker,
  PopupSwiper,
  Tabs,
} from "@arco-design/mobile-react";
import { ReactComponent as FindIcon } from "@/assets/icon/find.svg";
import { bgColor } from "@/styles/buttonColorConfig";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "@/context/Product";
import { IconClose } from "@arco-design/mobile-react/esm/icon";
import * as Product from "@/services/Product";
import * as Time from "@/components/function/time_2";
import MyToast from "@/components/Toast/toast";

export default function Find({
  searchData,
  setSearchData,
  handleLookup,
  searchDataLabel,
  setSearchDataLabel,
}) {
  const [visible, setVisible] = useState(false);

  const { currentProduct } = useContext(ProductContext);
  let disabled =
    searchData.queries.length > 8 || searchData.queries.length <= 0; //* 当所选变量大于8时不可进行查询
  function handleSelect() {
    setVisible(!visible);
  }

  return (
    <>
      {/* {Object.keys(currentProduct).length === 0 ? (
        <></>
      ) : ( */}
      <>
        <Button
          icon={<FindIcon className="iconInfo"></FindIcon>}
          bgColor={bgColor}
          color="blue"
          onClick={handleSelect}
          className="tab-under-button"
        >
          查找
        </Button>
        <PopupSwiper
          visible={visible}
          close={() => {
            setVisible(false);
            setSearchData({ queries: [], tags: {} });
          }}
          direction={"right"}
        >
          <div style={{ width: "8rem" }}>
            <DevicePicker
              searchData={searchData}
              setSearchData={setSearchData}
            ></DevicePicker>
            <DatePick
              searchData={searchData}
              setSearchData={setSearchData}
            ></DatePick>

            <TagPicker
              searchData={searchData}
              setSearchData={setSearchData}
            ></TagPicker>
            <VariablePicker
              searchData={searchData}
              setSearchData={setSearchData}
              currentProduct={currentProduct}
            ></VariablePicker>
            <Button
              className="popup-button"
              disabled={disabled}
              onClick={() => {
                console.log("click");
                handleLookup();
              }}
            >
              查询
            </Button>
          </div>
        </PopupSwiper>
      </>
      {/* )} */}
    </>
  );
}

function DevicePicker({ searchData, setSearchData }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Cell
        label="设备"
        text={
          searchData.device !== undefined
            ? searchData.device.name
            : "当前暂未选择设备"
        }
        showArrow
        onClick={() => setVisible(!visible)}
      ></Cell>
      <Picker
        data={[{ label: "暂无数据", value: "no device" }]}
        visible={visible}
        maskClosable={true}
        cascade={false}
        onHide={() => setVisible(!visible)}
        onOk={(val, searchData) => {}}
        onDismiss={() => setVisible(!visible)}
      ></Picker>
    </>
  );
}

function DatePick({ searchData, setSearchData }) {
  const [picker1Visible, setPicker1Visible] = useState(false);
  const [picker2Visible, setPicker2Visible] = useState(false);
  // const [start, setStart] = useState("");
  // const [end, setEnd] = useState("");
  console.log(searchData)
  return (
    <>
      <Cell>时间</Cell>
      <Tabs
        type="card"
        tabs={[{ title: "近一小时" }, { title: "今天" }, { title: "近7天" }]}
        defaultActiveTab={-1}
        onChange={(tab, index) => {
          // 获取当前时间
          console.log(index);
          if (index === 0) {
            setSearchData({
              ...searchData,
              start: Time.GetRecentHourIso(),
              end: Time.GetNowIso(),
            });
          } else if (index === 1)
            setSearchData({
              ...searchData,
              start: Time.GetRecentDayIso(),
              end: Time.GetNowIso(),
            });
          else
            setSearchData({
              ...searchData,
              start: Time.GetRecentWeekIso(),
              end: Time.GetNowIso(),
            });
        }}
      ></Tabs>
      <Cell
        showArrow
        label="起始时间"
        onClick={() => {
          setPicker1Visible(true);
        }}
      >
        {Time.UTCtoNormal(searchData.start)}
      </Cell>
      <Cell
        showArrow
        label="终止时间"
        onClick={() => {
          setPicker2Visible(true);
        }}
      >
        {Time.UTCtoNormal(searchData.end)}
      </Cell>
      <DatePicker
        visible={picker1Visible}
        onDismiss={() => setPicker1Visible(!picker1Visible)}
        typeArr={["year", "month", "date", "hour", "minute"]}
        maskClosable
        disabled={false}
        currentTs={searchData.start}
        onHide={() => {
          setPicker1Visible(false);
        }}
        onOk={(data) => {
          setSearchData({
            ...searchData,
            start: Time.convertTimestampToUTC(data),
          });
        }}
      />
      <DatePicker
        visible={picker2Visible}
        onDismiss={() => setPicker2Visible(!picker2Visible)}
        typeArr={["year", "month", "date", "hour", "minute"]}
        maskClosable
        disabled={false}
        currentTs={searchData.end}
        onHide={() => {
          setPicker2Visible(false);
        }}
        onOk={(data) => {
          setSearchData({
            ...searchData,
            end: Time.convertTimestampToUTC(data),
          });
        }}
      />
    </>
  );
}
function TagPicker({ searchData, setSearchData }) {
  const [tagKeyVisible, setTagKeyVisible] = useState(false);
  const [tagValueVisible, setTagValueVisible] = useState(false);

  //* 请求得到的所有key和value
  const tagKey = useRef([]);
  const tagValue = useRef([]);
  //* 已选的tag
  const selectTag = useRef(<></>);
  //* key和value一起出现
  const selectTagKey = useRef("");
  const selectTagValue = useRef("");
  const currentProduct = useContext(ProductContext);
  useEffect(() => {
    Product.GetAllTagKeyOfaProduct(currentProduct.id)
      .then((data) => {
        tagKey.current = data;
      })
      .catch((error) => {
        MyToast("error", "获取key列表失败");
      });
  }, []);
  useEffect(() => {
    Product.GetAllTagValueOfaProduct(currentProduct.id, selectTagKey)
      .then((data) => {
        tagValue.current = data;
      })
      .catch((error) => {
        MyToast("error", "获取标签值列表失败");
      });
  }, [selectTagKey]);
  //* 获取tags的key:value列表
  let keyEle = tagKey.current.map((data) => {
    return { label: data, value: data };
  });
  const keyList = [];
  let valueEle = tagValue.current.map((data) => {
    return { label: data, value: data };
  });
  keyList.push(keyEle);
  const valueList = [];
  valueList.push(valueEle);
  function handleDelSelectTag(tagKey) {
    let temp = { ...searchData.tags };
    delete temp[tagKey];
    setSearchData({ ...searchData, tags: temp });
  }
  function handleAddTags() {
    if (selectTagKey.current !== "" && selectTagValue.current !== "") {
      let temp = searchData.tags;
      temp[selectTagKey.current] = selectTagValue.current;
      setSearchData({ ...searchData, tags: temp });
      selectTagKey.current = "";
      selectTagValue.current = "";
    }
  }

  selectTag.current = Object.keys(searchData.tags).map((key, idx) => {
    return (
      <Cell
        key={idx}
        label={key + ":" + searchData.tags[key]}
        className="tags-span tags-cell"
        bordered={false}
      >
        <Button
          icon={<IconClose></IconClose>}
          className="tags-del-button"
          bgColor={bgColor}
          color="black"
          onClick={() => handleDelSelectTag(key)}
        ></Button>
      </Cell>
    );
  });
  return (
    <>
      <Cell>标签</Cell>
      <Cell
        showArrow
        label="标签键"
        text={selectTagKey.current}
        onClick={() => setTagKeyVisible(!tagKeyVisible)}
      ></Cell>
      <Cell
        showArrow
        label="标签值"
        text={selectTagValue.current}
        onClick={() => setTagValueVisible(!tagValueVisible)}
      ></Cell>
      {selectTag.current}
      <Button onClick={handleAddTags}>添加</Button>
      <Picker
        data={keyList}
        visible={tagKeyVisible}
        maskClosable={true}
        cascade={false}
        onHide={() => setTagKeyVisible(!tagKeyVisible)}
        onOk={(val, searchData) => {
          selectTagKey.current = val[0];
          setTagKeyVisible(!setTagKeyVisible);
        }}
        onDismiss={() => setTagKeyVisible(!tagKeyVisible)}
        // value={searchData.tagKey}
      ></Picker>

      <Picker
        data={valueList}
        visible={tagValueVisible}
        maskClosable={true}
        cascade={false}
        onHide={() => setTagKeyVisible(!tagValueVisible)}
        onOk={(val, data) => {
          //* val是一个变量列表 []
          selectTagValue.current = val[0];

          setTagValueVisible(!tagValueVisible);
        }}
        onDismiss={() => setTagValueVisible(!tagValueVisible)}
        // value={searchData.tagKey}
      ></Picker>
    </>
  );
}

function VariablePicker({ searchData, setSearchData }) {
  const [visible, setVisible] = useState(false);
  const { currentProduct } = useContext(ProductContext);
  const selectVariable = useRef([]);
  const specification = currentProduct.specification;
  let a = specification.filter((data) => {
    return data.dataType.type === "int" || data.dataType.type === "float";
  });
  a = a.map((data) => {
    return { label: data.name, value: data.variable };
  });
  const variableListLa_va = [];
  variableListLa_va.push(a);
  function handleDelSelectVariable(field) {
    let q = searchData.queries;
    q = q.filter((data) => {
      return data.field !== field;
    });
    setSearchData({ ...searchData, queries: q });
    selectVariable.current = q;
  }
  selectVariable.current = searchData.queries.map((field, idx) => {
    let varia = specification.find((e) => e.variable === field.field);
    return (
      <Cell
        key={idx}
        label={
          <div>
            {varia.name}
            <div>{varia.variable}</div>
          </div>
        }
        className="tags-span tags-cell"
        bordered={false}
      >
        {Object.keys(varia.dataType.specs).length !== 0 ? (
          <span>{`${varia.dataType.specs.unitName}(${varia.dataType.specs.unit})`}</span>
        ) : (
          <></>
        )}
        <Button
          icon={<IconClose></IconClose>}
          className="tags-del-button"
          bgColor={bgColor}
          color="black"
          onClick={() => handleDelSelectVariable(field.field)}
        ></Button>
      </Cell>
    );
  });
  function handleAddAllSeleVarias() {
    let queries = specification.map((data) => {
      return { field: data.variable };
    });
    selectVariable.current = queries;
    setSearchData({ ...searchData, queries: queries });
  }
  function handleDelAllSele() {
    setSearchData({ ...searchData, queries: [] });
    selectVariable.current = [];
  }
  let disabled = selectVariable.current.length > 8;
  if (disabled) MyToast("warn", "每次所选变量数不得大于8");
  console.log(disabled);
  return (
    <Cell.Group>
      <Cell>变量</Cell>
      <div className="div-variables">
        <Button
          className="button-variable"
          inline
          bgColor={bgColor}
          color={"black"}
          onClick={handleAddAllSeleVarias}
        >
          全部添加
        </Button>
        <Button
          className="button-variable"
          inline
          bgColor={bgColor}
          color={"black"}
          onClick={handleDelAllSele}
        >
          全部清除
        </Button>
      </div>
      <Cell
        label="请选择变量"
        text={"selectVariable"}
        showArrow
        onClick={() => setVisible(!visible)}
      ></Cell>
      {selectVariable.current}
      <Picker
        visible={visible}
        data={variableListLa_va}
        maskClosable={true}
        cascade={false}
        onDismiss={() => setVisible(!visible)}
        onOk={(val, data) => {
          let q = searchData.queries;
          setVisible(!visible);
          let flag = true;
          q.map((data) => {
            if (data.field === val[0]) flag = false;
          });
          if (flag) {
            q.push({ field: val[0] });
            setSearchData({ ...searchData, queries: q });
            selectVariable.current = q;
            // setSearchDataLabel([...searchDataLabel,])
          }
        }}
      ></Picker>
    </Cell.Group>
  );
}
