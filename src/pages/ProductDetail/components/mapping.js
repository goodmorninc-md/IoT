import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import { ListAllMapofProd, RemoveMapping } from "@/services/mapping";
import { Button, Input, Textarea } from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import { useNavigate } from "react-router-dom";

export default function Mapping() {
  const { currentProduct } = useContext(ProductContext);
  const [mappings, setMappings] = useState([]);
  const navigate = useNavigate();

  const url = window.location.href;
  const productId = url.split("/").reverse()[0].split("?")[0];
  console.log(productId);

  useEffect(() => {
    console.log("effect");
    ListAllMapofProd(currentProduct.id).then((data) => {
      setMappings(data);
    });
  }, []);
  const Trs = MappingList(productId, mappings, setMappings, navigate);
  return (
    <>
      <Button
        onClick={() => {
          navigate(`/product/${productId}/mapping/edit`);
        }}
      >
        新建映射
      </Button>
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody>{Trs}</tbody>
      </table>
    </>
  );
}

//* 所有映射的列表
function MappingList(productId, mappings, setMappings, navigate) {
  const DelColorConfig = {
    normal: "#ff0000",
    active: "#fbe1d9",
    disabled: "#FFF",
  };

  function handleChange(currentMapId) {
    navigate(
      `/product/${productId}/mapping/edit?mapping=${currentMapId}`
    );
  }
  function handleDelete(delMappingId) {
    RemoveMapping(productId, delMappingId).then((data) => {
      const newMappings = mappings.filter((e) => {
        return e.id !== delMappingId;
      });
      setMappings(newMappings);
      MyToast("success", "删除成功");
    });
  }

  let child = mappings.map((data, idx) => {
    return (
      <Fragment key={idx}>
        <tr>
          <td>{data.name}</td>
          <td>{data.description}</td>
          <div className="tr-div">
            <Button
              onClick={() => {
                handleChange(data.id);
              }}
              style={{ width: "30%" }}
            >
              编辑
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
  return child;
}
