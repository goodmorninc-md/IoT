import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import { ListAllMapofProd, RemoveMapping } from "@/services/mapping";
import { Button, Input, Textarea } from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyToast from "@/components/Toast/toast";
import { useNavigate } from "react-router-dom";
import InfoList from "@/components/InfoList/infoList";

export default function Mapping({ activeIndex }) {
  const { currentProduct } = useContext(ProductContext);
  const [mappings, setMappings] = useState([]);
  const navigate = useNavigate();

  const url = window.location.href;
  const productId = url.split("/").reverse()[0].split("?")[0];
  console.log(productId);

  useEffect(() => {
    if (activeIndex === 2)
      ListAllMapofProd(currentProduct.id)
        .then((data) => {
          setMappings(data);
        })
        .catch((error) => {
          MyToast("error", "获取变量列表失败");
        });
  }, [activeIndex]);
  const Trs = MappingList(productId, mappings, setMappings, navigate);
  return (
    <>
      <Button
        onClick={() => {
          navigate(`/product/${productId}/mapping/edit`);
        }}
        className="tabs-under-button"
      >
        新建映射
      </Button>
      {Trs}
      {/* <table className="table">
        <thead className="TrTable">
          <tr>
            <th>名称</th>
            <th>描述</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table> */}
    </>
  );
}

//* 所有映射的列表
function MappingList(productId, mappings, setMappings, navigate) {
  function handleChange(currentMapId) {
    navigate(`/product/${productId}/mapping/edit?mapping=${currentMapId}`);
  }
  function handleDelete(delMappingId) {
    RemoveMapping(productId, delMappingId)
      .then((data) => {
        const newMappings = mappings.filter((e) => {
          return e.id !== delMappingId;
        });
        setMappings(newMappings);
        MyToast("success", "删除成功");
      })
      .catch((error) => {
        MyToast("error", "删除变量失败");
      });
  }

  let child = (
    <InfoList
      InfoArray={mappings}
      handleLook={(data) => handleChange(data.id)}
      handleDel={(data) => handleDelete(data.id)}
    ></InfoList>
  );
  return child;
  // mappings.map((data, idx) => {
  //   return (
  //     <Fragment key={idx}>
  //       <tr>
  //         <td>{data.name}</td>
  //         <td>{data.description}</td>
  //         <div className="tr-div">
  //           <Button
  //             onClick={() => {
  //               handleChange(data.id);
  //             }}
  //             style={{ width: "30%" }}
  //           >
  //             编辑
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
}
