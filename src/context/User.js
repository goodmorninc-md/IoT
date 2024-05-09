import { useState,createContext } from "react";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {  
  const [usersList, setUsersList] = useState([
    {
      id: "6bd185f99fb725b27d8edc12",
      fullName: "John Well",
      email: "john@gmail.com",
      phone: "13812345678",
      nickname: "johnW",
      gender: 0,
      avatar:
        "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
      initialPassword: false,
      activatedAt: "2019-08-24T14:15:22Z",
      banned: false,
      role: 21,
    },
  ]);
  //* currentSelect设置为对象
  const [currentSelectUser, setCurrentSelectUser] = useState({
    id: "6bd185f99fb725b27d8edc12",
    fullName: "John Well",
    email: "john@gmail.com",
    phone: "13812345678",
    nickname: "johnW",
    gender: 0,
    avatar:
      "http://wx.qlogo.cn/mmopen/vi_32/aSKcBBPpibyKNicHNTMM0qJVh8Kjgiak2AHWr8MHM4WgMEm7GFhsf8OYrySdbvAMvTsw3mo8ibKicsnfN5pRjl1p8HQ/0",
    initialPassword: false,
    activatedAt: "2019-08-24T14:15:22Z",
    banned: false,
    role: 21,
  });
  return (
    <UserContext.Provider
      value={{
        currentSelectUser,
        setCurrentSelectUser,
        usersList,
        setUsersList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
