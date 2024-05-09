import { Cell } from "@arco-design/mobile-react";
import { ProductContext } from "@/context/Product";
import { useContext } from "react";
export default function ProductInfos({}) {
  const { currentProduct, productList } = useContext(ProductContext);

  console.log(currentProduct)
  let eles = Object.keys(currentProduct).map((e, idx) => {
    if(e ==="specification") return <></>
    return <Cell key={idx}>{e + " : " + currentProduct[e]}</Cell>;
  });

  return <Cell.Group>{eles}</Cell.Group>;
}
