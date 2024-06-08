import React from "react";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import TabBar from "./components/TabBar/TabBar";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import UserDetail from "@/pages/UserDetail";
import Mapping from "@/pages/EditMapping";
import Custormer from "./pages/Custormer";
import Firmware from "./pages/firmwareDetail";
import UpgradeBatch from "./pages/upgradeBatch";
import UpgradeBatchDetail from "./pages/upgradeBatch/upgradeBatchDatail";
import Device from "@/pages/device";
import DeviceDetail from "./pages/deviceDetail";
import Monitor from "@/pages/monitoring";
import Alert from "@/pages/alert";
import Test from "@/pages/test";
import { OrganizationContextProvider } from "@/context/Organization";
import { AuthProvider } from "@/context/AuthContext";
import { ProductContextProvider } from "@/context/Product";
import { UserContextProvider } from "@/context/User";
import { CustormerContextProvider } from "./context/Custormer";
import { FirmwareContextProvider } from "./context/firmware";
import PointDetail from "./pages/pointDetail";

function App() {
  const location = useLocation();
  const showTabbar = [
    "/",
    "/product",
    "/device",
    "/monitoring",
    "/alert",
  ].indexOf(location.pathname);
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  useEffect(() => {
    if (location.pathname !== prevPathname) {
      setPrevPathname(location.pathname);
    }
  }, [location.pathname, prevPathname]);

  return (
    <div>
      <TransitionGroup>
        <CSSTransition key={prevPathname} timeout={300} classNames="fade">
          <div className="fade">
            <Routes location={location}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home activeIndex={showTabbar} />} />
              <Route
                path="/product"
                element={<Product activeIndex={showTabbar} />}
              />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route
                path="/device"
                element={<Device activeIndex={showTabbar} />}
              />
              <Route path="/user/:userId" element={<UserDetail />} />
              <Route
                path="/product/:productId/mapping/edit"
                element={<Mapping />}
              />
              <Route
                path="/product/:productId/custormer"
                element={<Custormer />}
              />
              <Route
                path="/product/:productId/firmware/:firmwareId"
                element={<Firmware />}
              />
              <Route
                path="/product/:productId/firmware/:firmwareId/upgrade"
                element={<UpgradeBatch />}
              />
              <Route
                path="/product/:productId/point/:pointId"
                element={<PointDetail></PointDetail>}
              ></Route>
              <Route
                path="/monitoring"
                element={<Monitor activeIndex={showTabbar} />}
              />
              <Route
                path="/product/:productId/firmware/:firmwareId/upgradebatch/:batchId"
                element={<UpgradeBatchDetail />}
              />
              <Route path="/device/:deviceId" element={<DeviceDetail />} />
              <Route
                path="/alert"
                element={<Alert activeIndex={showTabbar} />}
              />
              <Route path="/test" element={<Test />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
      {showTabbar !== -1 && (
        <TabBar className="tabs" activeIndex={showTabbar}></TabBar>
      )}
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <CustormerContextProvider>
      <FirmwareContextProvider>
        <ProductContextProvider>
          <UserContextProvider>
            <OrganizationContextProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </OrganizationContextProvider>
          </UserContextProvider>
        </ProductContextProvider>
      </FirmwareContextProvider>
    </CustormerContextProvider>
  </Router>
);

export default AppWrapper;

//* day 1
// todo 页面切换导航，api代码编写，done
// todo 检查Authorization请求头是否设置好 done
// todo 选择好组织后，显示该组织的主页内容，并设置context 组织id done
// todo 考虑错误信息弹窗编写 done

//* day 2
// todo 登录状态编写：考虑先采用是否存在token来判断是否登录
// todo 产品页编写
// todo 点击进去页面最顶部使用导航栏

//* day 3
// todo 调整样式：看看移动端怎么调宽度 使用Less编写
// todo 看后端文档，找合适接口

//* day 4
// todo 看api文档，看哪个url对应哪个 done
// todo 编写侧栏和添加组织，看需要添加什么信息 给input框加上必选项
// todo 添加成员信息需要哪些、showInfo有哪些
// todo 进行产品页的开发

//* day 5
// todo 将产品页的弹窗调整
// todo 考虑搜索栏怎么调试 -->跟原应用一样就行
// todo 将点击的tr列表做成一个详情页
// todo 设计admin/

//* day 6
// todo 数据解析页的没写完
// todo 后面还有四个没写完明天写完
// todo api读懂

//* day 7
// todo 产品客户页的删除功能

//* day 8
// todo 重新捋一遍context的逻辑 把Dropdown改成DropdownMenu
// todo 示意图、监测点页面完成
// todo 设备1页 设备详情一页
// todo 监控一页
// todo 告警一页

//* day 8
// todo 把drawer里面的下拉选框换成picker，就是不支持搜索

//* day 9
// todo 样式调整，先调样式
// todo 每个下滑弹窗需要添加一个标题
// todo 对每个页面增加错误处理,分页处理/loading，确认删除选框
// todo 产品信息标签添加编辑
// todo 物模型上传文件
// todo 监测点还没做完
// todo 新建固件按键没做，设备固件的几个按键，使用客户的编辑
// todo 设备信息的设备标签
// todo 监控页三个标签

//* day 10
// todo 问一下老吴influxDB那个不指定function等方式是不是就是仅选变量
// todo 调整告警页的样式

//* day 11
// todo 对每个trlist看能不能添加一个箭头 done
// todo 设备页删除按键没做  done
// todo 客户页修改案件没做  done
// todo 产品详情示意图
// todo 产品详情监测点  done

//* day 12
// todo 把缺少的功能
// todo 把api请求的分页做好
// todo 不同用户的页面
//todo 新建数据解析 / 监测点 /  固件详情-》批量升级/删除 批次升级 done
//todo 新建固件的上传不知道怎么做
//todo 添加客户 客户信息/弹窗 done
//todo 示意图
//todo 设备数据解析 done
//todo 监控 缩略图/客户和标签
//todo 告警事件的查询按键
//todo 在产品详情加一个条件判断，当tab在哪加载 done

//* day13
//? 绑定设备的api后端文档没写
//? 在find devices of a product里面return的point字段代表绑定的设备
//todo 登录判断 //* 登录判断
/*const { authState } = useContext(AuthContext);
  // const thisUser = authState.user;
  // if (Object.keys(thisUser).length === 0) navigate("/login"); */

//* day14
//todo input框加个边框
//todo 物模型变量的修改
