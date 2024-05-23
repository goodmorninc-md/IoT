import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Product from "./pages/Product";
// import Login from "./componets/login"
import ProductDetail from "./pages/ProductDetail";
import UserDetail from "@/pages/UserDetail";
import Mapping from "@/pages/EditMapping";
import Custormer from "./pages/Custormer";
import Firmware from "./pages/firmwareDetail";
import UpgradeBatch from "./pages/upgradeBatch";
import UpgradeBatchDetail from "./pages/upgradeBatch/upgradeBatchDatail";
import Device from "@/pages/device";

import { OrganizationContextProvider } from "@/context/Organization";
import { AuthProvider } from "@/context/AuthContext";
import { ProductContextProvider } from "@/context/Product";
import { UserContextProvider } from "@/context/User";
import { CustormerContextProvider } from "./context/Custormer";
import { FirmwareContextProvider } from "./context/firmware";
import DeviceDetail from "./pages/deviceDetail";
import Monitor from "@/pages/monitoring";
import Alert from "@/pages/alert";
import Test from "@/pages/test";
//* AuthState创建时请求
//* Organization也为创建时请求
//* UserConntext为获取用户列表时请求
//* ProductContext为ProductList组件进行请求
function App() {
  return (
    <Router>
      <CustormerContextProvider>
        <FirmwareContextProvider>
          <ProductContextProvider>
            <UserContextProvider>
              <OrganizationContextProvider>
                <AuthProvider>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                    <Route
                      path="/product/:productId"
                      element={<ProductDetail />}
                    />
                    <Route path="/device" element={<Device />} />
                    <Route path="/user/:userId" element={<UserDetail />} />
                    <Route
                      path="/product/:productId/mapping/edit"
                      element={<Mapping />}
                    ></Route>
                    <Route
                      path="/product/:productId/custormer"
                      element={<Custormer />}
                    ></Route>
                    <Route
                      path="/product/:productId/firmware/:firmwareId"
                      element={<Firmware></Firmware>}
                    ></Route>
                    <Route
                      path="/product/:productId/firmware/:firmwareId/upgrade"
                      element={<UpgradeBatch></UpgradeBatch>}
                    ></Route>
                    <Route
                      path="/monitoring"
                      element={<Monitor></Monitor>}
                    ></Route>
                    <Route
                      path="/product/:productId/firmware/:firmwareId/upgradebatch/:batchId"
                      element={<UpgradeBatchDetail></UpgradeBatchDetail>}
                    ></Route>
                    <Route
                      path="/device/:deviceId"
                      element={<DeviceDetail></DeviceDetail>}
                    ></Route>
                    <Route path="/alert" element={<Alert></Alert>}></Route>
                    <Route path="/test" element={<Test></Test>}></Route>
                    
                  </Routes>
                </AuthProvider>
              </OrganizationContextProvider>
            </UserContextProvider>
          </ProductContextProvider>
        </FirmwareContextProvider>
      </CustormerContextProvider>
    </Router>
  );
}

export default App;

//* day 1
// todo 页面切换导航，api代码编写，done
//todo 检查Authorization请求头是否设置好 done
// todo 选择好组织后，显示该组织的主页内容，并设置context 组织id done
// todo 考虑错误信息弹窗编写 done

//* day 2
//todo 登录状态编写：考虑先采用是否存在token来判断是否登录
//todo 产品页编写
//todo 点击进去页面最顶部使用导航栏

//* day3
//todo 调整样式：看看移动端怎么调宽度 使用Less编写
//todo 看后端文档，找合适接口
//todo

//* day4
//todo 看api文档，看哪个url对应哪个 done
//todo 编写侧栏和添加组织，看需要添加什么信息  给input框加上必选项
//todo 添加成员信息需要哪些、showInfo有哪些
//todo 进行产品页的开发

//* day5
//todo 将产品页的弹窗调整
//todo 考虑搜索栏怎么调试 -->跟原应用一样就行
//todo 将点击的tr列表做成一个详情页
//todo 设计admin/

//* day6
//todo 数据解析页的没写完
//todo 后面还有四个没写完明天写完
//todo api读懂

//* day7
//todo 产品客户页的删除功能

//* day8
//todo 重新捋一遍context的逻辑      把Dropdown改成DropdownMenu
//todo 示意图、监测点页面完成
//todo 设备1页 设备详情一页
//todo 监控一页
//todo 告警一页

//* day8
//todo 把drawer里面的下拉选框换成picker，就是不支持搜索

//* day9
//todo 样式调整，先调样式
//todo 每个下滑弹窗需要添加一个标题
//todo 对每个页面增加错误处理,分页处理/loading，确认删除选框
//todo 产品信息标签添加编辑
//todo 物模型上传文件
//todo 监测点还没做完
//todo 新建固件按键没做，设备固件的几个按键，使用客户的编辑
//todo 设备信息的设备标签
//todo 监控页三个标签

//*day10 
//todo 问一下老吴influxDB那个不指定function等方式是不是就是仅选变量
//todo 调整告警页的样式

//* day11 对每个trlist看能不能添加一个箭头