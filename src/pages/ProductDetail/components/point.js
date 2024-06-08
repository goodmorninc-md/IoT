import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  ListAllPointOfProd,
  CreateAPoint,
  DeletePoint,
} from "@/services/point";
import {
  Button,
  Input,
  PopupSwiper,
  Textarea,
} from "@arco-design/mobile-react";
import MyToast from "@/components/Toast/toast";
import Occupancy from "@/components/function/occupancy";
import { AuthContext } from "@/context/AuthContext";
import InfoList from "@/components/InfoList/infoList";
import { useNavigate } from "react-router-dom";
export default function Point({ activeIndex }) {
  const { currentProduct } = useContext(ProductContext);
  //* 创建时需要将AuthState的user作为body中的createdBy传入
  const { authState } = useContext(AuthContext);
  const [pointList, setPointList] = useState([]);
  const [record, setRecord] = useState({});
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (activeIndex === 3) {
      ListAllPointOfProd(currentProduct.id)
        .then((data) => {
          setPointList(data);
          console.log(data);
          // console.log(1)
        })
        .catch((error) => {
          MyToast("error", "获取监测点列表失败");
        });
    }
  }, [activeIndex]);

  function handleDelete(data) {
    DeletePoint(currentProduct.id, data.id)
      .then((res) => {
        let temp = pointList.filter((e) => {
          return e.id !== data.id;
        });
        setPointList([...temp]);
      })
      .catch((error) => {
        MyToast("error", "删除监测点失败");
      });
  }
  function handleLook(data) {
    navigate(`/product/${currentProduct.id}/point/${data.id}`);
  }
  function checkRequire() {
    if ("name" in record && record.name.length > 0) return true;
    else return false;
  }
  function handleCreateConfirm() {
    if (checkRequire()) {
      record.createdBy = authState.user;
      CreateAPoint(currentProduct.id, record)
        .then((data) => {
          MyToast("success", "创建成功");
          setVisible(!visible);
          setPointList([...pointList, record]);
        })
        .catch((error) => {
          MyToast("error", "创建监测点失败");
        });
    } else {
      MyToast("warn", "请填写名称");
    }
  }

  return (
    <>
      <Button onClick={() => setVisible(!visible)}  className="tabs-under-button">新建监测点</Button>
      {/* <table className="table">
        <thead className="TrTable">
          <tr>
            <th>监测点名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody> */}
      <InfoList
        InfoArray={pointList}
        handleLook={handleLook}
        handleDel={handleDelete}
      ></InfoList>
      {/* </tbody>
      </table> */}

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
          label="名称"
          placeholder="请输入监测点名称"
          onChange={(e) => {
            setRecord({ ...record, name: e.target.value });
          }}
        ></Input>
        <Textarea
          label={
            <span>
              <Occupancy></Occupancy>描述
            </span>
          }
          statisticsMaxlength={100}
          autosize
          autoFocus
          onChange={(e) =>
            setRecord({ ...record, description: e.target.value })
          }
        ></Textarea>
        <Button onClick={handleCreateConfirm}>确认新建</Button>
      </PopupSwiper>
    </>
  );
}
