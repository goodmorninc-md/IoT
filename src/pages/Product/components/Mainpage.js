import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import CreateProductButton from "./CreateProduct";
import InfoDrawer from "@/components/InfoDrawer/InfoDrawer";
import "@/styles/home.less";
import "@/styles/product.less";


import ProductList from "./ProductList";


export default function MainPage() {
  
  
  
  
  return (
    <>
      {/* 添加组织栏 */}

      <MyTopBar LeftChildren={<InfoDrawer></InfoDrawer>}>
        <CreateProductButton></CreateProductButton>
      </MyTopBar>
      <ProductList></ProductList>
      <MyTabBar activeIndex={1}></MyTabBar>
    </>
  );
}
