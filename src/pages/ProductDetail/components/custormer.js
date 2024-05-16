import { ProductContext } from "@/context/Product";
import { CustormerContext } from "@/context/Custormer";
import { Fragment, useContext, useEffect, useState } from "react";
import { ListAllMapofProd, RemoveMapping } from "@/services/mapping";
import { Button, Input, Textarea } from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import { useNavigate } from "react-router-dom";
import {
  ListCustormersOfProd,
  GetOneCust,
  UpdateCustormers,
  AddCustormer,
  DelCustormer,
} from "@/services/Custormer";
const DelColorConfig = {
  normal: "#ff0000",
  active: "#fbe1d9",
  disabled: "#FFF",
};
export default function Custormer() {
  const [custormerList, setCustormerList] = useState([]);

  const url = window.location.href
  const productId= url.split("/").reverse()[0].split("?")[0]
  console.log(productId)

  //* 获得该产品的客户列表
  useEffect(() => {
    ListCustormersOfProd(productId).then((data) => {
      console.log(data);
      setCustormerList(data);
    });
  }, []);
  return (
    <>
      <Button>添加客户</Button>
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>
          <Trs
            custormerList={custormerList}
            setCustormerList={setCustormerList}
          ></Trs>
        </tbody>
      </table>
    </>
  );
}
function Trs({ custormerList, setCustormerList }) {
  const { currentProduct } = useContext(ProductContext);
  const { cuccentCustormer, setCurrentCustormer } =
    useContext(CustormerContext);
  const navigate = useNavigate();
  const handleLook = (custormer) => {
    setCurrentCustormer(custormer)
    navigate(`/product/${currentProduct.id}/custormer`);
  };
  const handleDelete = (customerId) => {
    DelCustormer(currentProduct.id, customerId).then((res) => {
      let newCustormerList = custormerList.filter((data) => {
        return data.id !== customerId;
      });
      setCustormerList(newCustormerList);
      MyToast("success", "删除成功");
    });
  };
  console.log(custormerList);
  const list = custormerList.map((data, idx) => {
    return (
      <Fragment key={idx}>
        <tr>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <div className="tr-div">
            <Button
              onClick={() => {
                handleLook(data);
              }}
              style={{ width: "30%" }}
            >
              查看
            </Button>
            <Button
              onClick={() => handleDelete(data.id)}
              bgColor={DelColorConfig}
              style={{ width: "30%" }}
            >
              删除
            </Button>
          </div>
        </tr>
      </Fragment>
    );
  });
  return <>{list}</>;
}
