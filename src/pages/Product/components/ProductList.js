import { useState, useContext, useRef, useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { ProductContext } from "@/context/Product";
import { Button } from "@arco-design/mobile-react";
import { DelOneProduct } from "@/services/Product";

import Dialog from "@/components/Popover/delConfirm";

import InfoList from "@/components/InfoList/infoList";
import MyToast from "@/components/Toast/toast";
export default function ProductList({}) {
  const { currentProduct, setCurrentProduct, productList, setProductList } =
    useContext(ProductContext);

  const Navigate = useNavigate();

  // const handleChangeProduct = (data) => {
  //   const newProductList = productList.map((e) => {
  //     if (e.id === data.id) return data;
  //     else return e;
  //   });
  //   setProductList(newProductList);
  // };

  const handleNavigate = (productId) => {
    Navigate(`/product/${productId}`);
  };
  const handleDel = (productId) => {
    DelOneProduct(productId)
      .then((res) => {
        let newProductList = productList.filter((e) => {
          return e.id !== productId;
        });
        setProductList(newProductList);
        MyToast("success", "删除成功");
      })
      .catch((error) => {
        MyToast("error", "删除失败");
      });
  };
  //* 产品列表
  const ProductListMap = (
    <InfoList
      InfoArray={productList}
      handleLook={(data) => handleNavigate(data.id)}
      handleDel={(data) => handleDel(data.id)}
    ></InfoList>
  );

  return <>{ProductListMap}</>;
}
// productList.map((data, idx) => {
//   console.log(data);
//   return (
//     <tr>
//       <td>
//         <span className="tr-text">{data.name}</span>
//         <Button className="tr-button" onClick={}>
//           查看
//         </Button>
//       </td>
//       <td>
//         <span className="tr-text">{data.description}</span>
//         <Dialog content="删除" handleDel={() => console.log("del")}></Dialog>
//       </td>
//     </tr>
//   );
// });
