import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import {
  Button,
  Cell,
  Input,
  Radio,
  Textarea,
  Switch,
  Dialog,
} from "@arco-design/mobile-react";
import { PopupSwiper, Popup } from "@arco-design/mobile-react";
import * as DataRule from "@/services/datarule";
import { ProductContext } from "@/context/Product";
import MyToast from "@/components/Toast/toast";
import { bgColor, delButtonbgColor } from "@/styles/buttonColorConfig";
export default function DataAnalyse({}) {
  const [visible, setVisible] = useState(false);
  const [addData, setAddData] = useState({});
  const [dataruleList, setDataruleList] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const { currentProduct } = useContext(ProductContext);

  useEffect(() => {
    if ("id" in currentProduct) {
      DataRule.ListDataRules(currentProduct.id).then((data) => {
        console.log(data);
        setDataruleList(data);
      });
    } else {
      setDataruleList([]);
    }
  }, [currentProduct.id]);
  function handleClickCreate() {
    setVisible(!visible);
    setAddData({});
    setEditStatus(false);
  }
  function handleEdit(data) {
    setVisible(!visible);
    setEditStatus(true);
    DataRule.GetDataRule(currentProduct.id, "", "", data.id).then((data) => {
      setAddData(data);
    });
  }
  function handleConfirmCreate(addData) {
    DataRule.CreateDataRule(currentProduct.id, "", "", addData).then((data) => {
      setDataruleList([...dataruleList, addData]);
      console.log(addData);
      setVisible(!visible);
      //* 1为启用 2 为关闭
      // setAddData({ status: 2 });
      setAddData({});
      MyToast("success", "创建成功");
    });
  }
  function handleConfirmEdit(data) {
    console.log(data);
    DataRule.UpdateDataRule(currentProduct.id, "", "", data.id, data).then(
      (res) => {
        let dataruleListTemp = dataruleList.map((data) => {
          console.log(res);
          if (data.id === res.id) return res;
          return data;
        });
        setDataruleList(dataruleListTemp);
        setAddData({});
        MyToast("success", "修改成功");
        setVisible(!visible);
      }
    );
  }
  function handleEnabled(data) {
    DataRule.UpdateDataRule(currentProduct.id, "", "", data.id).then((res) => {
      let temp = [...dataruleList];
      temp.map((e) => {
        if (e.id === data.id) e.status = !e.status;
      });
      setDataruleList(temp);
    });
  }
  function handleDel(data) {
    showDialog("确认删除（此操作不可撤销）？", () => handleConfirmRemove(data));
  }
  function handleConfirmRemove(data) {
    DataRule.RemoveDatarule(currentProduct.id, "", "", data.id).then((res) => {
      let temp = dataruleList.filter((ele) => ele.id !== data.id);
      setDataruleList(temp);
    });
  }
  let DataRuleListMap = dataruleList.map((data, idx) => {
    return (
      <Fragment key={data.id}>
        <tr>
          <td>
            {data.description}
            <Button onClick={() => handleEdit(data)}>编辑</Button>
          </td>
          <td>
            <Switch
              checked={data.status}
              platform="ios"
              onChange={(value) => {
                console.log(value);
                let text = !data.status
                  ? "确认启用该数据处理规则?"
                  : "确认关闭该数据处理规则？";
                showDialog(text, () => handleEnabled(data));
                // showInfo(value)
              }}
            />
            <Button onClick={() => handleDel(data)} bgColor={delButtonbgColor}>
              删除
            </Button>
          </td>
        </tr>
      </Fragment>
    );
  });
  return Object.keys(currentProduct).length > 0 ? (
    <>
      <Button onClick={() => handleClickCreate()} className="tab-under-button">
        新增
      </Button>
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>描述</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          {DataRuleListMap.length > 0 ? (
            DataRuleListMap
          ) : (
            <Cell className="cell-lack-data" text="暂无数据"></Cell>
          )}
        </tbody>
      </table>
      <InfoPopup
        visible={visible}
        setVisible={setVisible}
        addData={addData}
        setAddData={setAddData}
        handleConfirmCreate={handleConfirmCreate}
        handleConfirmEdit={handleConfirmEdit}
        editStatus={editStatus}
        setEditStatus={setEditStatus}
      ></InfoPopup>
    </>
  ) : (
    <Cell className="cell-lack-data"> 暂无数据</Cell>
  );
}

function showDialog(info, confirm, cancel) {
  Dialog.confirm({
    title: info,

    platform: "ios",
    okText: "确认",
    cancelText: "取消",
    onOk: confirm,
  });
}

function InfoPopup({
  visible,
  setVisible,
  addData,
  setAddData,
  handleConfirmCreate,
  handleConfirmEdit,
  editStatus,
  setEditStatus,
}) {
  return (
    <PopupSwiper
      visible={visible}
      close={() => {
        setVisible(false);
      }}
      allowSwipeDirections={["right", "bottom"]}
      exitDirection={"bottom"}
    >
      <Input
        required
        label="描述"
        placeholder="请输入描述"
        defaultValue={addData.description}
        onChange={(e) => {
          setAddData({ ...addData, description: e.target.value });
        }}
      ></Input>
      <Cell
        label={
          <>
            <span style={{ color: "red" }}>* </span>类型
          </>
        }
      >
        <Radio.Group
          layout="inline"
          defaultValue={0}
          disabled={editStatus}
          onChange={(e) => {
            console.log(e);
            setAddData({ ...addData, type: e });
          }}
        >
          <Radio value={0}>流式</Radio>
          <Radio value={1}>批处理</Radio>
        </Radio.Group>
      </Cell>
      <Textarea
        required
        defaultValue={addData.script}
        prepend={
          <span className="popup-prepend">
            <span className="popup-prepend-star">* </span>
            <span className="popup-prepend-text"> 脚本 </span>
          </span>
        }
        // statisticsMaxlength={50}
        autosize
        placeholder="Please enter the script"
        border="all"
        rows={2}
        renderStatistics={(cur, max) => `${cur}/${max}`}
        onChange={(e) => {
          console.log(e.target.value);
          setAddData({ ...addData, script: e.target.value });
        }}
      />
      <Button
        onClick={
          editStatus
            ? () => handleConfirmEdit(addData)
            : () => handleConfirmCreate(addData)
        }
      >
        确认{editStatus ? "修改" : "添加"}
      </Button>
    </PopupSwiper>
  );
}
