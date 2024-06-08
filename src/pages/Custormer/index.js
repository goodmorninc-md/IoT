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
  PopupSwiper,
} from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyDropDown from "@/components/Dropdown/dropdown";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
import { GetOneCust, UpdateCustormer } from "@/services/Custormer";
import Pop from "./component/Popupswiper";
import { AuthContext } from "@/context/AuthContext";
import { ReactComponent as IconGetBack } from "@/assets/icon/getBack.svg";
import { bgColor } from "@/styles/buttonColorConfig";
import TitleWithButton from "@/components/TopBar/titleWithButton";
import { ReactComponent as IconUser } from "@/assets/icon/addUser.svg";
import Occupancy from "@/components/function/occupancy";
import EditInfo from "./component/editInfo";
export default function Custormer({}) {
  const navigate = useNavigate();
  const { currentProduct } = useContext(ProductContext);
  const { currentCustormer, setCurrentCustormer } =
    useContext(CustormerContext);
  return (
    <>
      <MyTopBar
        LeftChildren={
          <Button
            icon={<IconGetBack className="iconInfoFpage"></IconGetBack>}
            onClick={() =>
              navigate(`/product/${currentProduct.id}?tab=custormer`)
            }
            bgColor={bgColor}
          ></Button>
        }
        content={currentCustormer.name}
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
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    GetOneCust(currentCustormer.id).then((data) => {
      setCustInfo(data);
      //   console.log(data);
    }).catch(error=>{
      MyToast("error","获取用户信息失败")
    });;
  }, []);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <>
      <TitleWithButton
        title={"客户信息"}
        handleClick={handleChange}
      ></TitleWithButton>

      <Cell.Group>
        <Cell
          label="名称"
          text={custInfo.name}
          bordered={false}
          className="cell-userInfo"
        ></Cell>
        <Cell
          label="地址"
          bordered={false}
          text={custInfo.address}
          className="cell-userInfo"
        ></Cell>
        <Cell
          label="联系人"
          bordered={false}
          text={custInfo.contact}
          className="cell-userInfo"
        ></Cell>
        <Cell
          label="电话"
          bordered={false}
          text={custInfo.phone}
          className="cell-userInfo"
        ></Cell>
        <Cell
          label="描述"
          bordered={false}
          text={custInfo.description}
          className="cell-userInfo"
        ></Cell>
      </Cell.Group>
      <EditInfo
        custInfo={custInfo}
        setCustInfo={setCustInfo}
        visible={visible}
        setVisible={setVisible}
      ></EditInfo>
    </>
  );
}

function editInfo({ visible, setVisible }) {}
function UserAccount({}) {
  const { currentCustormer, setCurrentCustormer } =
    useContext(CustormerContext);

  const [userList, setUserList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectUser, setSelectUser] = useState({});
  useEffect(() => {
    ListUsers(currentCustormer.id).then((data) => {
      setUserList(data);
    }).catch(error=>{
      MyToast("error","获取用户列表失败")
    });
  }, []);

  const users = userList.map((data, idx) => {
    return (
      <Avatar
        className="cell-userInfo"
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
      <TitleWithButton
        title="用户账号"
        handleClick={() => setVisible(!visible)}
        ButtonIcon={<IconUser></IconUser>}
      ></TitleWithButton>

      {users}
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
