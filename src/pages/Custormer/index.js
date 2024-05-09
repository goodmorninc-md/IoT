import { ProductContext } from "@/context/Product";
import { CustormerContext } from "@/context/Custormer";
import { Fragment, useContext, useEffect, useState } from "react";
import { ListUsers } from "@/services/User";
import {
  Button,
  Cell,
  Divider,
  Input,
  Textarea,
  Avatar,
} from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import {  useNavigate } from "react-router-dom";
import { GetOneCust } from "@/services/Custormer";
import Pop from "./component/Popupswiper";
import { AuthContext } from "@/context/AuthContext";
export default function Custormer({}) {
  const navigate = useNavigate();
  const {currentProduct} = useContext(ProductContext)
  return (
    <>
      <MyTopBar
        LeftChildren={
          <Button onClick={() => navigate(`/product/${currentProduct.id}?tab=custormer`)}>返回</Button>
        }
      ></MyTopBar>

      <UserInfo></UserInfo>
      <Divider></Divider>
      <UserAccount></UserAccount>
    </>
  );
}
function UserInfo({}) {
  const { currentCustormer, setCurrentCustormer } =
    useContext(CustormerContext);
  const [custInfo, setCustInfo] = useState({});
  const handleChange = () => {};
  useEffect(() => {
    GetOneCust(currentCustormer.id).then((data) => {
      setCustInfo(data);
      //   console.log(data);
    });
  }, []);
  return (
    <>
      <div>
        <span>客户信息</span>
        <Button onClick={handleChange}>编辑</Button>
      </div>
      <Cell.Group>
        <Cell label="名称" text={custInfo.name}></Cell>
        <Cell label="地址" text={custInfo.address}></Cell>
        <Cell label="联系人" text={custInfo.contact}></Cell>
        <Cell label="电话" text={custInfo.phone}></Cell>
        <Cell label="描述" text={custInfo.description}></Cell>
      </Cell.Group>
    </>
  );
}
function UserAccount({}) {
  const { currentCustormer, setCurrentCustormer } =
    useContext(CustormerContext);
  
  const [userList, setUserList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectUser, setSelectUser] = useState({});
  useEffect(() => {
    ListUsers(currentCustormer.id).then((data) => {
      setUserList(data);
    });
  }, []);

  
  const users = userList.map((data, idx) => {
    return (
      <Avatar
        key={idx}
        size="large"
        src={data.avatar}
        avatarName={data.fullName}
        avatarDesc={data.email}
        onClick={() => {
          setVisible(!visible);
          setSelectUser(data);
          console.log(data);
        }}
      ></Avatar>
    );
  });
  return (
    <>
      <div>
        <span>用户账号</span>
        <Button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          添加用户
        </Button>
        {users}
      </div>
      <Pop
        custInfo={selectUser}
        visible={visible}
        setVisible={setVisible}
        setSelectUser={setSelectUser}
        userList={userList}
        setUserList={setUserList}
      ></Pop>
    </>
  );
}
