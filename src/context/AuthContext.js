import MyToast from "@/components/Toast/toast";
import { useContext,createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetInfoOfUser } from "@/services/Auth";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') === null ? "":localStorage.getItem('token'),
    isAuthenticated: false,
    user:{}
  });
  // const [currentUser,setCurrentUser] = useState({})

  const navigate = useNavigate()


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    setAuthState({
      token: null,
      isAuthenticated: false,
    });
    navigate("/login")
  };
  

//  在组件加载时验证Token的有效性
  useEffect(() => {
    if (authState.token) {
      console.log("authState")
      //? 是否存在验证token有效性的api
      GetInfoOfUser(authState.token).then(data=>{
        console.log(data)
        setAuthState({...authState,user:data})
      })
    }
    else{
       MyToast('error',"please login")
        navigate("/login")
      }
  }, []);

  return (
    <AuthContext.Provider value={{authState,setAuthState,logout }}>
      {children}
    </AuthContext.Provider>
  );
};
