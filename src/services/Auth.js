import axios from "axios";
import { API_URL } from "./Data";
import MyToast from "@/components/Toast/toast";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const PostLogin = async (
  body = {
    email: "",
    phone: "",
    password: "",
    captcha: "",
  }
) => {
  const response = await axios.post(`${API_URL}/auth/signin`, body);
  console.log(response);
  return response.data.token;
};
export const GetCaptchaImage = async () => {
  // axios.defaults.headers.common["Authorization"]
  const response = await axios.get(`${API_URL}/auth/captcha`);
  return response.data;
};
export const GetInfoOfUser = async (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // const response = await axios.get(`${API_URL}/auth/me`);

  const response = {
    data: {
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
      roles: [
        {
          role: 1,
          identity: "78d185f99fb725b27d8edc03",
        },
      ],
    },
  };
  return response.data;
};

export const UpdatePW = async (token, newPW) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const url = API_URL + "/auth/update-password";
  const response = axios.put(url, { password: newPW });
  return response.data;
};
