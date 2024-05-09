import {
  PopupSwiper,
  Cell,
  Input,
  Radio,
  Switch,
  Button,
} from "@arco-design/mobile-react";
import { useEffect, useState, useContext } from "react";
import { AddUser, ChangeUserInfo, DelUser } from "@/services/User";
import { CustormerContext } from "@/context/Custormer";
import { AuthContext } from "@/context/AuthContext";
import MyToast from "@/components/Toast/toast";
import { useNavigate } from "react-router-dom";

export default function Pop({
  custInfo = {},
  visible,
  setVisible,
  setSelectUser,
  userList,
  setUserList,
}) {
  const [newInfo, setNewInfo] = useState({ ...custInfo });
  const { currentCustormer } = useContext(CustormerContext);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const thisUser = authState.user;
  if (Object.keys(thisUser).length === 0) navigate("/login");
  useEffect(() => {
    setNewInfo({ ...custInfo });
  }, [custInfo]);

  let disabled = Object.keys(custInfo).length !== 0;
  const role = ["31", "32"];

  if (disabled) console.log((newInfo.role % 10) - 1);
  const handleConfirm = () => {
    if (
      "fullName" in newInfo &&
      "email" in newInfo &&
      newInfo.email.length &&
      newInfo.fullName.length
    ) {
      //* 修改元素
      if (disabled) {
        ChangeUserInfo(newInfo, currentCustormer.id).then((res) => {
          let newUserList = userList.map((data) => {
            if (data.id === newInfo.id) return res;
            else return data;
          });
          setUserList(newUserList);
          MyToast("success", "修改成功");
        });
      } else
        AddUser(newInfo, currentCustormer.id).then((data) => {
          setVisible(!visible);
          setUserList([...userList, data]);
          MyToast("success", "添加成功");
        });
      setSelectUser({});
    } else MyToast("warn", "请输入");
  };

  const handleDelete = () => {
    let roles = authState.user.roles;

    DelUser().then((data) => {
      setVisible(!visible);
      let newUserList = userList.filter((e) => {
        return e.id !== newInfo.id;
      });
      setUserList(newUserList);
      MyToast("success", "删除成功");
    });
  };

  let flag = false;
  console.log(thisUser.roles);
  if (thisUser.roles !== undefined)
    thisUser.roles.map((data) => {
      if (data.role === 1) flag = true;
      else if (data.role === 21) flag = true;
    });
  //* 是否存在删除按键是是为管理员和账户未激活
  let DelDisabled = flag && !custInfo.initialPassword;

  let son = (
    <Cell.Group>
      <Input
        required
        disabled={disabled}
        label="姓名"
        defaultValue={disabled ? newInfo.fullName : ""}
        placeholder="请输入用户姓名"
        onChange={(e) => {
          console.log(e.target.value);
          setNewInfo({ ...newInfo, fullName: e.target.value });
        }}
      ></Input>
      <Input
        required
        disabled={disabled}
        label="邮箱|手机号"
        defaultValue={disabled ? newInfo.email : ""}
        onChange={(e) => {
          setNewInfo({ ...newInfo, email: e.target.value });
        }}
      ></Input>
      <Cell label="性别">
        <Radio.Group
          layout="inline"
          defaultValue={disabled ? (newInfo.role % 10) - 1 : -1}
          onChange={(value) => {
            setNewInfo({ ...newInfo, gender: value });
          }}
          disabled={disabled}
        >
          <Radio value={0} style={{ height: 54 }}>
            未知
          </Radio>
          <Radio value={1} style={{ height: 54 }}>
            男
          </Radio>
          <Radio value={2} style={{ height: 54 }}>
            女
          </Radio>
        </Radio.Group>
      </Cell>
      <Cell label="角色">
        <Radio.Group
          layout="inline"
          disabled={disabled}
          defaultValue={disabled ? newInfo.gender % 10 : -1}
          onChange={(value) => {
            setNewInfo({ ...newInfo, role: role[value] });
          }}
        >
          <Radio value={0} style={{ height: 54 }}>
            客户管理员
          </Radio>

          <Radio value={1} style={{ height: 54 }}>
            客户成员
          </Radio>
        </Radio.Group>
      </Cell>
      <Cell label="禁用">
        <Switch
          defaultChecked={disabled ? newInfo.banner : false}
          platform="android"
          onChange={(e) => {
            console.log(e);
            setNewInfo({ ...newInfo, banner: e });
          }}
          onClick={() => console.log("click")}
        />
      </Cell>

      <Button onClick={handleConfirm}>确认</Button>
      <Button onClick={handleDelete} disabled={DelDisabled}>
        移除账号
      </Button>
    </Cell.Group>
  );
  return (
    <PopupSwiper
      visible={visible}
      close={() => {
        setVisible(false);
        setSelectUser({});
      }}
      allowSwipeDirections={["right", "bottom"]}
      exitDirection={"bottom"}
    >
      {son}
    </PopupSwiper>
  );
}
