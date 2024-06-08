import { AuthContext } from "@/context/AuthContext";
import { useState, useContext } from "react";

import {
  Button,
  Divider,
  Input,
  Image,
  Toast,
  Cell,
} from "@arco-design/mobile-react";
import "@arco-design/mobile-react/esm/style";
import IconUser from "@arco-design/mobile-react/esm/icon/IconUser";
import { ReactComponent as PasswordIcon } from "@/assets/icon/password.svg";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { PostLogin } from "@/services/Auth";
import MyToast from "@/components/Toast/toast";
export default function Login({}) {
  const { authState, setAuthState } = useContext(AuthContext);
  const [password, setPassWord] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassWord(e) {
    setPassWord(e.target.value);
  }
  const handleSubmit = async () => {
    try {
      const requestData = {
        email: email,
        password: password,
      };

      PostLogin(requestData).then((token) => {
        if (token !== false) {
          setAuthState({
            ...authState,
            email: email,
          });
          localStorage.setItem("token", token);
          //* 导航到首页
          navigate("/");
        }
      }).catch(error=>{
        MyToast("error","发送失败")
      });
    } catch (error) {
      MyToast("error", "error");
    } finally {
    }
  };
  const colorConfig =
    "linear-gradient(278.7deg, #0578FF 5.08%, #15D5FF 108.09%)";

  return (
    <div className="bg">
      <div className="font">
        物联网平台<Divider content="" hairline={false}></Divider>
      </div>

      <div className="login-container">
        <Input
          label={
            <div className="demo-input-icon">
              <IconUser
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                }}
              />
              Username
            </div>
          }
          placeholder="邮箱或手机"
          border="none"
          onChange={handleChangeEmail}
          value={email}
          className="login-input"
        />

        <Input
          label={
            <div className="demo-input-icon">
              <PasswordIcon
                style={{
                  width: "0.5rem",
                  height: "0.5rem",
                }}
              ></PasswordIcon>
              Password
            </div>
          }
          placeholder="密码"
          border="none"
          onChange={handleChangePassWord}
          value={password}
          type="password"
          className="login-input"
        />
        <div className="login-div">
          <Button
            needActive
            bgColor={colorConfig}
            onClick={handleSubmit}
            size="huge"
            shape="round"
            className="login-input"
            style={{width:"30%"}}
          >
            登录/注册
          </Button>
        </div>

        {/* <div>
          这里需要引入一个选择栏
          <span>
            我已阅读并同意<a href="https://www.baidu.com">《隐私政策权》</a>
          </span>
        </div> */}
      </div>
    </div>
  );
}
