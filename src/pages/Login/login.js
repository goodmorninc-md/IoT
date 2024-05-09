import { AuthContext } from "@/context/AuthContext";
import { useState, useContext } from "react";
import "@arco-design/mobile-react/esm/style";
import {
  Button,
  Divider,
  Input,
  Image,
  Toast,
  Cell,
} from "@arco-design/mobile-react";

import IconUser from "@arco-design/mobile-react/esm/icon/IconUser";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { PostLogin } from "@/services/Auth";
export default function Login({}) {
  const { authState, setAuthState } = useContext(AuthContext);
  const [password, setPassWord] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
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
      });
    } catch (error) {
      console.error("登录请求失败:", error);
    } finally {
      // setLoading(false); // 完成加载，无论成功还是失败
    }
  };
  const colorConfig =
    "linear-gradient(278.7deg, #0578FF 5.08%, #15D5FF 108.09%)";

  //下面的图片换成password

  return (
    <>
      <div className="font">MyIot</div>
      <Divider content="12321321311111" hairline={false}></Divider>

      <div>
        <Input
          label={
            <div className="demo-input-icon">
              <IconUser
                style={{
                  marginRight: 10,
                  fontSize: 20,
                  color: "#4E5969",
                  verticalAlign: "middle",
                }}
              />
              Username
            </div>
          }
          placeholder="please enter username"
          border="none"
          onChange={handleChangeEmail}
          value={email}
        />

        <Input
          label={
            <div className="demo-input-icon">
              <Image
                src="//sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg"
                width={30}
              ></Image>
              Password
            </div>
          }
          placeholder="please enter password"
          border="none"
          onChange={handleChangePassWord}
          value={password}
          type="password"
        />
      </div>
      <div>
        <Button
          needActive
          bgColor={colorConfig}
          onClick={handleSubmit}
          size="huge"
          shape="square"
          borderColor="white"
        >
          登录/注册
        </Button>
        <Cell label="Success tips" showArrow onClick={handleSubmit} />
      </div>

      <div>
        这里需要引入一个选择栏
        <span>
          我已阅读并同意<a href="https://www.baidu.com">《隐私政策权》</a>
        </span>
      </div>
      <button
        onClick={() => {
          Toast.error({
            content: 123123,
            duration: 1000,
          });
        }}
      >
        test
      </button>
    </>
  );
}
