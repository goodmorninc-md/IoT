import MyTopBar from "@/components/TopBar/TopBar";
import MyPopover from "@/components/Popover/Popover";

import { useState, useContext, useRef, useEffect } from "react";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { UserContext } from "@/context/User";

import { Button, Cell, Input, Switch } from "@arco-design/mobile-react";

import "@/styles/home.less";
import { useNavigate } from "react-router-dom";
import MyToast from "@/components/Toast/toast";
import { ReactComponent as IconGetBack } from "@/assets/icon/getBack.svg";
import GetTime from "@/components/function/time";
import Pickers from "@/components/select/select";
import { delButtonbgColor } from "@/styles/buttonColorConfig";
export default function MyMainPage() {
  const navigate = useNavigate();
  const { currentSelectUser, setCurrentSelectUser, usersList, setUsersList } =
    useContext(UserContext);

  const [changed, setChanged] = useState(false);
  const handleReturnToMain = () => {
    navigate("/");
  };
  const bgColor = {
    normal: "transparent",
    active: "#fbe1d9",
    disabled: "#FFF",
  };
  let LeftChildren = (
    <Button
      className="Bu"
      onClick={handleReturnToMain}
      bgColor={bgColor}
      icon={<IconGetBack className="iconInfoFpage"></IconGetBack>}
    ></Button>
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
    navigate("/");
  };

  return (
    <>
      <MyTopBar LeftChildren={LeftChildren}></MyTopBar>

      <div className="currentDetail">{currentSelectUser.fullName}</div>
      <Cell.Group>{show}</Cell.Group>
      {changed === false ? (
        <div className="twobutton-div">
          <Button
            onClick={() => setChanged(!changed)}
            className="two-button-button"
          >
            编辑信息
          </Button>
          <Button
            onClick={handleDeleteUser}
            className="two-button-button"
            bgColor={delButtonbgColor}
          >
            删除用户
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
let infos = {
  email: "邮箱",
  phone: "电话",
  gender: "性别",
  activatedAt: "激活时间",
  banned: "是否禁用",
};
let gend = ["未知", "男", "女"];

function UserInfo({ currentSelectUser }) {
  let temp = { ...currentSelectUser };
  temp.banned = temp.banned ? "是" : "否";
  temp.gender = gend[temp.gender];
  temp.activatedAt = GetTime(temp.activatedAt);
  let infoCells = Object.keys(infos).map((key, idx) => {
    return (
      <Cell
        key={idx}
        label={infos[key]}
        text={temp[key]}
        className="cell-userInfo"
        bordered={false}
      ></Cell>
    );
  });
  return <>{infoCells}</>;
}

function UserInfoChange({
  currentSelectUser,
  setCurrentSelectUser,
  changed,
  setChanged,
}) {
  const [record, setRecord] = useState({ ...currentSelectUser });
  const handleChangeInfoConfirm = () => {
    setCurrentSelectUser({ ...record });

    setChanged(!changed);
    MyToast("success", "修改成功");
  };

  let UserInfoInputs = Object.keys(infos).map((key, idx) => {
    if (key === "banned" || key === "activatedAt" || key === "gender")
      return <></>;
    return (
      <Input
        label={infos[key]}
        text={currentSelectUser[key]}
        defaultValue={currentSelectUser[key]}
        onChange={(e) => {
          let info = { ...record };
          info[key] = e.target.value;
          setRecord(info);
        }}
        clearable
      ></Input>
    );
  });
  UserInfoInputs.push(
    <Pickers
      label={"性别"}
      singleList={[
        { label: "未知", value: "0" },
        { label: "男", value: "1" },
        { label: "女", value: "2" },
      ]}
      text={gend[record.gender]}
      handleChange={(e) => {
        setRecord({ ...record, gender: e });
      }}
      title="选择性别"
    ></Pickers>
  );
  UserInfoInputs.push(
    <Input
      label={"激活时间"}
      text={currentSelectUser.activatedAt}
      defaultValue={currentSelectUser.activatedAt}
      disabled
    ></Input>
  );
  UserInfoInputs.push(
    <Cell label="是否禁用">
      <Switch
        checked={record.banned}
        platform="android"
        onChange={(value) => {
          let info = { ...record };
          info.banned = value;
          setRecord(info);
        }}
        onClick={(e) => console.log(e.target)}
      />
    </Cell>
  );
  return (
    <>
      {UserInfoInputs}
      <div className="twobutton-div">
        <Button onClick={handleChangeInfoConfirm} className="two-button-button">
          确认修改
        </Button>
        <Button
          onClick={() => setChanged(!changed)}
          className="two-button-button"
        >
          取消修改
        </Button>
      </div>
    </>
  );
}
