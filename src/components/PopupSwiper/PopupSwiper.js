import { PopupSwiper, Cell, Button } from "@arco-design/mobile-react";
import { useState } from "react";
import { Input } from "@arco-design/mobile-react";
//* 需要更新Popup内部的状态，所以必须要返回一个组件
//type : info显示信息 / create 创建 / update更新
//key : 在cell/input框中的label值
//keysInEng : key对应的英文，需要发给后端
//data : 不同type的作用不同
//requireIdx : 必须输入的选项
// handleConfirm ： 创建 / 更新后对应的操作

export default function InfoPopupSwiper({
  type,
  keys,
  keysInEng,
  data,
  requiredIdx,
  handleConfirm,
  children,

}) {

  const [visible,setVisible]= useState(false);
  const [update, setUpdate] = useState(false);
  let son;
  
  switch (type) {
    case "info": {
      let dataListMap = Object.keys(data).map((e, idx) => {
        return <Cell>{e + " : " + data[e]}</Cell>;
      });
      son = (
        <>
          <Cell.Group>{dataListMap}</Cell.Group>
          {children}
        </>
      );
      break;
    }
    case "create": {
      let dataListMap = keys.map((value, idx) => {
        // console.log(e);
        return (
          <Input
            label={value + ":"}
            required={requiredIdx.indexOf(idx) !== -1 ? true : false}
            onChange={(e) => {
              // console.log(value);
              data[keysInEng[idx]] = e.target.value;
            }}
            clearable={true}
            border={true}
          />
        );
      });
      son = (
        <>
          {dataListMap}
          <Button
            onClick={() => {
              handleConfirm();
              setVisible(!visible);
            }}
          >
            确认添加
          </Button>
        </>
      );
      break;
    }
    case "update": {
      //* 获取修改数据列表
      let dataListMap = keysInEng.map((value, idx) => {
        return (
          <Input
            label={value + ":"}
            required={requiredIdx.indexOf(idx) !== -1 ? true : false}
            onChange={(e) => {
              // console.log(value);
              data[keysInEng[idx]] = e.target.value;
            }}
            clearable={true}
            border={true}
            defaultValue={data[value]}
          />
        );
      });
      let eles = Object.keys(data).map((e, idx) => {
        return <Cell>{e + " : " + data[e]}</Cell>;
      });
      son =
        update === false ? (
          <>
            {eles}
            <Button
              onClick={() => {
                setUpdate(!update);
              }}
              className=""
            >
              修改信息
            </Button>
            {children}
          </>
        ) : (
          <>
            {dataListMap}
            <Button
              onClick={() => {
                //* 发起网络请求
                handleConfirm();
                setUpdate(!update);
              }}
            >
              确认修改
            </Button>
          </>
        );
      break;
    }
    default: {
      return <></>;
    }
  }
  return (
    <>
      <Button></Button>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
          setUpdate(false);
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        {son}
      </PopupSwiper>
    </>
  );
}
