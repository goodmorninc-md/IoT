import MainPage from "./components/MainPage";

import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import MyPopover from "@/components/Popover/Popover";

import { useState, useContext, useRef, useEffect } from "react";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { UserContext } from "@/context/User";

import { Button, Cell, Input } from "@arco-design/mobile-react";
import { IconQuestionCircle } from "@arco-design/mobile-react/esm/icon";
import "@/styles/home.less";
import { useNavigate } from "react-router-dom";
import MyToast from "@/components/Toast/toast";
export default function MyMainPage() {
  const navigate = useNavigate();
  const { currentSelectUser, setCurrentSelectUser, usersList, setUsersList } =
    useContext(UserContext);

  const [changed, setChanged] = useState(false);
  const handleReturnToMain = () => {
    navigate("/");
  };
  let LeftChildren = (
    <Button className="Bu" onClick={handleReturnToMain}>
      返回
    </Button>
  );

  let show = changed ? (
    <UserInfoChange
      currentSelectUser={currentSelectUser}
      setCurrentSelectUser={setCurrentSelectUser}
      changed={changed}
      setChanged={setChanged}
    />
  ) : (
    <UserInfo currentSelectUser={currentSelectUser} />
  );

  const handleDeleteUser = () => {
    MyToast("success", "删除成功");
    navigate("/")
  };
  return (
    <>
      <MyTopBar LeftChildren={LeftChildren}></MyTopBar>

      <div>
        <div>用户信息</div>
      </div>
      <Cell.Group>{show}</Cell.Group>
      {changed === false ? (
        <>
          <Button onClick={() => setChanged(!changed)}>编辑信息</Button>
          <Button onClick={handleDeleteUser}>删除用户</Button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
function UserInfo({ currentSelectUser }) {
  let UserInfo = Object.keys(currentSelectUser).map((key, idx) => {
    return <Cell label={key} text={currentSelectUser[key]}></Cell>;
  });
  return <>{UserInfo}</>;
}

function UserInfoChange({
  currentSelectUser,
  setCurrentSelectUser,
  changed,
  setChanged,
}) {
  const record = useRef(currentSelectUser);
  const handleChangeInfoConfirm = () => {
    setCurrentSelectUser({ ...record.current });

    setChanged(!changed);
    MyToast("success", "修改成功");
  };

  let UserInfoInputs = Object.keys(currentSelectUser).map((key, idx) => {
    return (
      <Input
        label={key}
        text={currentSelectUser[key]}
        defaultValue={currentSelectUser[key]}
        onChange={(e) => {
          record.current[key] = e.target.value;
        }}
      ></Input>
    );
  });
  return (
    <>
      {UserInfoInputs}
      <Button onClick={handleChangeInfoConfirm}>确认修改</Button>
      <Button onClick={() => setChanged(!changed)}>取消修改</Button>
    </>
  );
}
