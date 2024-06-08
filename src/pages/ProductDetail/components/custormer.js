import { ProductContext } from "@/context/Product";
import { CustormerContext } from "@/context/Custormer";
import { Fragment, useContext, useEffect, useState } from "react";
import { Button, Input, PopupSwiper, Cell } from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import { useNavigate } from "react-router-dom";
import {
  ListCustormersOfProd,
  AddCustormer,
  DelCustormer,
} from "@/services/Custormer";
import Occupancy from "@/components/function/occupancy";
import InfoList from "@/components/InfoList/infoList";
const DelColorConfig = {
  normal: "#ff0000",
  active: "#fbe1d9",
  disabled: "#FFF",
};
export default function Custormer({ activeIndex }) {
  const [custormerList, setCustormerList] = useState([]);
  const { currentCustormer, setCurrentCustormer } =
    useContext(CustormerContext);
  const navigate = useNavigate();

  const url = window.location.href;
  const productId = url.split("/").reverse()[0].split("?")[0];
  const [visible, setVisible] = useState(false);
  const [record, setRecord] = useState({});
  //* 获得该产品的客户列表
  useEffect(() => {
    if (activeIndex === 6)
      ListCustormersOfProd(productId)
        .then((data) => {
          setCustormerList(data);
        })
        .catch((error) => {
          MyToast("error", "获取客户列表失败");
        });
  }, [activeIndex]);

  function handleAddCust() {
    if ("name" in record && record.name.length > 0)
      AddCustormer(record, productId)
        .then((res) => {
          setCustormerList([...custormerList, record]);
          MyToast("success", "创建成功");
          setVisible(!visible);
        })
        .catch((error) => {
          MyToast("error", "创建客户失败");
        });
    else {
      MyToast("warn", "名称不可为空");
    }
  }
  const handleLook = (custormer) => {
    setCurrentCustormer(custormer);
    navigate(`/product/${productId}/custormer`);
  };
  const handleDelete = (customer) => {
    DelCustormer(productId, customer.id).then((res) => {
      let newCustormerList = custormerList
        .filter((data) => {
          return data.id !== customer.id;
        })
        .catch((error) => {
          MyToast("error", "删除客户失败");
        });
      setCustormerList(newCustormerList);
      MyToast("success", "删除成功");
    });
  };
  return (
    <>
      <Button
        onClick={() => setVisible(!visible)}
        className="tabs-under-button"
      >
        添加客户
      </Button>

      {/* <table className="table">
        <thead className="TrTable">
          <tr>
            <th>名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody> */}
      {/* <Trs
            custormerList={custormerList}
            setCustormerList={setCustormerList}
          ></Trs> */}
      <InfoList
        InfoArray={custormerList}
        handleLook={(data) => handleLook(data)}
        handleDel={(data) => handleDelete(data)}
      ></InfoList>
      {/* </tbody>
      </table> */}
      <PopupSwiper
        visible={visible}
        direction="bottom"
        exitDirection={["right", "bottom"]}
        close={() => setVisible(!visible)}
      >
        <Cell className="popup-title">添加客户</Cell>
        <Input
          label="名称"
          required
          onChange={(e) => setRecord({ ...record, name: e.target.value })}
        ></Input>
        <Input
          label={
            <>
              <Occupancy></Occupancy>地址
            </>
          }
          onChange={(e) => setRecord({ ...record, address: e.target.value })}
        ></Input>
        <Input
          label={
            <>
              <Occupancy></Occupancy>联系人
            </>
          }
          onChange={(e) => setRecord({ ...record, contact: e.target.value })}
        ></Input>
        <Input
          label={
            <>
              <Occupancy></Occupancy>电话
            </>
          }
          onChange={(e) => setRecord({ ...record, phone: e.target.value })}
        ></Input>
        <Input
          label={
            <>
              <Occupancy></Occupancy>描述
            </>
          }
          onChange={(e) =>
            setRecord({ ...record, description: e.target.value })
          }
        ></Input>
        <Button onClick={handleAddCust}>确认添加</Button>
      </PopupSwiper>
    </>
  );
}
function Trs({ custormerList, setCustormerList }) {
  // const { currentProduct } = useContext(ProductContext);
  // console.log(custormerList);
  // const list = custormerList.map((data, idx) => {
  //   return (
  //     <Fragment key={idx}>
  //       <tr>
  //         <td>{data.name}</td>
  //         <td>{data.description}</td>
  //         <div className="tr-div">
  //           <Button
  //             onClick={() => {
  //               handleLook(data);
  //             }}
  //             style={{ width: "30%" }}
  //           >
  //             查看
  //           </Button>
  //           <Button
  //             onClick={() => handleDelete(data.id)}
  //             bgColor={DelColorConfig}
  //             style={{ width: "30%" }}
  //           >
  //             删除
  //           </Button>
  //         </div>
  //       </tr>
  //     </Fragment>
  //   );
  // });
  // return <>{list}</>;
}
