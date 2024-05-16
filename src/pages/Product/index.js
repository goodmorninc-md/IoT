import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import CreateProductButton from "./components/CreateProduct";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";
import ProductList from "./components/ProductList";
import "@/styles/home.less";
import "@/styles/product.less";

export default function Product() {
  return (
    <>
      <MyTopBar LeftChildren={<InfoDrawer></InfoDrawer>}>
        <CreateProductButton></CreateProductButton>
      </MyTopBar>
      <ProductList></ProductList>
      <MyTabBar activeIndex={1}></MyTabBar>
    </>
  );
}
