import axios from "axios";
import { API_URL } from "./Data";
import MyToast from "@/components/Toast/toast";
//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;
/**
 * 各个管理员通过查询id实现
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns
 */
export const ListUsers = async (organizationId = "", customerId = "") => {
  var Url =
    `${API_URL}/user?` +
    (organizationId !== "" ? "organizationId=" + organizationId : "") +
    (customerId !== "" ? "&customerId=" + customerId : "");
  const response = await axios.get(Url);

  return response.data;
};
/**
 * admin才可
 * @param {*} data 新添加的用户数据
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns
 */
export const AddUser = async (data, organizationId = "", customerId = "") => {
  var Url = `${API_URL}/user?`;
  // +(organizationId !== "" ? "organizationId=" + organizationId : "") +
  // (customerId !== "" ? "&customerId=" + customerId : "");
  console.log(Url);
  const response = await axios.post(Url, data);

  return response.data;
};

export const ChangeUserInfo = async (data, organizationId = "", token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  console.log(data);
  var Url = `${API_URL}/user`;
  // +(organizationId !== "" ? "/:organizationId" + organizationId : "") +
  // (customerId !== "" ? "/:customerId" + customerId : "");
  console.log(Url);
  // const response = await axios.post(Url,data);
  const response = {
    status: 200,
    data: data,
  };
  // console.log(response.data);
  return response.data;
};
export const DelUser = async (userId, organizationId = "", customerId = "") => {
  // console.log(data);
  var Url = `${API_URL}/user/${userId}`;
  // +(organizationId !== "" ? "/:organizationId" + organizationId : "") +
  // (customerId !== "" ? "/:customerId" + customerId : "");
  console.log(Url);
  // const response = await axios.del(Url,data);

  const response = {
    status: 200,
    data: { data: "Yes" },
  };
  // console.log(response.data);
  return response.data;
};
