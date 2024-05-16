// AddUser.js
import { useEffect, useState, useContext, useRef, Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { UserContext } from "@/context/User";
import { AddUser, ListUsers } from "@/services/User";
import { Input, Cell } from "@arco-design/mobile-react";

import MyToast from "@/components/Toast/toast";
import { ChangeUserInfo, DelUser } from "@/services/User";
import CreateOrg from "@/components/PopupSwiper/CreateOrg";
import Info from "@/components/PopupSwiper/Update.js";
import { useNavigate } from "react-router-dom";
import{ ReactComponent as IconUser} from "@/assets/icon/addUser.svg"
const User = ({ currentSelect }) => {
  //** 需要一个record State来记录当前修改的信息，如果通过ref传给子组件，子组件不能对父组件进行修改 */
  //* 想通过UserList向父组件传信息，但是
  //* record是记录当前点击的是哪一个元素，在取消修改时，不会发起请求，并丢弃之前的内容
  //* 不用ref的原因：点击每个tr之后，ref值被修改，但是不会触发重新渲染，所以会导致修改页面仍为空
  //* 修改record的时机：在修改页面进行修改时，并且仅在确认修改后才进行请求，
  const [record, setRecord] = useState({});
  const { current_Organization } = useContext(OrganizationContext);
  const { currentSelectUser, setCurrentSelectUser, usersList, setUsersList } =
    useContext(UserContext);
  const recordUserList = usersList;

  const { authState, login, logout } = useContext(AuthContext); //获取登录token
  const token = authState.token;
  const addData = useRef({});
  const navigate = useNavigate();
  //* 选择成员信息时，请求成员信息
  useEffect(() => {
    ListUsers(token,current_Organization.id).then((data) => {
      // console.log(data);
      setUsersList(data);
    });
  }, [currentSelect]);

  try {
    const keys = ["姓名", "邮箱", "电话", "role", "性别"];
    const keysInEng = ["fullName", "email", "phone", "role", "gender"];
    const requiredIdx = [0];
    const handleAddUserConfirm = () => {
      AddUser(addData.current, token).then((data) => {
        MyToast("success", "添加成功");
        setUsersList([...usersList, data]);
        addData.current = {};
      });
    };

    const handleClickTr = (e) => {
      console.log(e);
      setCurrentSelectUser(e);
      navigate(`/user/${currentSelectUser.id}`);
    };
    const usersListMap = recordUserList.map((e, idx) => {
      return (
        <tr key={idx} onClick={() => handleClickTr(e)}>
          <td>{e.fullName}</td>
          <td>{e.phone}</td>
        </tr>
      );
    });
    //* 添加成员页面
    let dataListMap = keys.map((value, idx) => {
      return (
        <Input
          label={value + ":"}
          required={requiredIdx.indexOf(idx) !== -1 ? true : false}
          onChange={(e) => {
            // console.log(value);
            addData.current[keysInEng[idx]] = e.target.value;
          }}
          clearable={true}
          border={true}
        />
      );
    });

    return (
      <>
        <CreateOrg
          keys={keys}
          keysInEng={keysInEng}
          requiredIdx={requiredIdx}
          addData={addData.current}
          handleConfirm={handleAddUserConfirm}
          content={"添加成员"}
          className={"tab-firstP-button"}
          icon={<IconUser />}
        >
          {dataListMap}
        </CreateOrg>

        <table className="table">
          <thead className="TrTable">
            <tr>
              <th>姓名</th>
              <th>电话</th>
            </tr>
          </thead>
          <tbody>{usersListMap}</tbody>
        </table>
      </>
    );
  } catch (error) {
    console.log(error);
  }
};

export default User;



function originFunction() {
  // const keys = ["姓名", "邮箱", "电话", "role", "性别"];
  //   const keysInEng = ["fullName", "email", "phone", "role", "gender"];
  // const handleAddUserConfirm = () => {
  //   AddUser(addData.current, token).then((data) => {
  //     MyToast("success", "添加成功");
  //     setUsersList([...usersList, data]);
  //     addData.current = {};
  //   });
  // };
  //   //* 点击Popup的删除用户的功能
  //   const handleDeleteUser = (id) => {
  //     DelUser(id, token).then((data) => {
  //       MyToast("success", "删除成功");
  //       const newusersList = usersList.filter((e) => {
  //         // console.log(id, e.id);
  //         return e.id !== id;
  //       });
  //       setUsersList(newusersList);
  //     });
  //   };
  //   //* 点击确认修改信息的功能
  //   const handleChangeInfo = (data) => {
  //     ChangeUserInfo(data, current_Organization, token).then((responseData) => {
  //       MyToast("success", "修改成功");
  //       const newusersList = usersList.map((e) => {
  //         if (e.id === responseData.id) return responseData;
  //         else return e;
  //       });
  //       setUsersList(newusersList);
  //     });
  //   };
  //   //* 不可为空的选项
  //   const requiredIdx = [0];
  //* 渲染用户列表
  // const usersListMap = recordUserList.map((e) => {
  //   // console.log(e);
  //   return (
  //     <Info
  //       info={e}
  //       id={e.id}
  //       handleChange={handleChangeInfo}
  //       handleDelete={handleDeleteUser}
  //       updateContent={InputDataListMap}
  //       record={record}
  //       setRecord={setRecord}
  //     >
  //       <td>{e.fullName}</td>
  //       <td>{e.phone}</td>
  //     </Info>
  //   );
  // });
  //   //* 更新页面的内容，这里的value是原标签
  //   let InputDataListMap = keysInEng.map((value, idx) => {
  //     // console.log(e);
  //     return (
  //       <Input
  //         label={keys[idx] + ":"}
  //         required={requiredIdx.indexOf(idx) !== -1 ? true : false}
  //         onChange={(e) => {
  //           let a = record;
  //           a[value] = e.target.value;
  //           console.log("a", a);
  //           setRecord(a);
  //         }}
  //         clearable={true}
  //         border={true}
  //         defaultValue={record[value]}
  //       />
  //     );
  //   });
}
