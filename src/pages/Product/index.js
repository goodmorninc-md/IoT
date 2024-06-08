import MyTopBar from "@/components/TopBar/TopBar";
import CreateProductButton from "./components/CreateProduct";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";
import ProductList from "./components/ProductList";

export default function Product({activeIndex}) {
  return (
    <div className="Not-cover">
      <MyTopBar LeftChildren={<InfoDrawer activeIndex={activeIndex}></InfoDrawer>}>
        <CreateProductButton></CreateProductButton>
      </MyTopBar>
      <ProductList></ProductList>
    </div>
  );
}
