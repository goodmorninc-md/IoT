import { OrganizationContext } from "@/context/Organization";
import axios from "axios";
import { API_URL } from "./Data";
import MyToast from "@/components/Toast/toast";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;

//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
// * token通过全局的context传入(AuthContext)

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

/**
 * permission : 仅admin
 * @param {*} token
 * @returns
 */
export const GetOrganizationList = async () => {
  try {
    // const response = await axios.get(`${API_URL}/organizations`);
    const response = {
      data:[
        {
          id: "12",
          name: "绿源天然气有限公司",
          description: "注塑机",
        },
        {
          id: "13",
          name: "绿源天然气有限公司2",
          description: "注塑机",
        },
        {
          id: "14",
          name: "绿源天然气有限公司3",
          description: "注塑机",
        },
      ]
    }
    return response.data;
  } catch (error) {
    console.log(error);
    MyToast("error", "加载错误");
    return [];
  }
};
/**
 * 仅admin
 * @param {*} body :name required
 * @param {*} token
 * @returns
 */
export const CreateOrganization = async (body, token) => {
  const response = await axios.post(`${API_URL}/organization`, body);
  // const response = {
  //   data: {
  //     id: "6bd185f99fb725b27d8edc12",
  //     name: "绿源天然气有限公司",
  //     description: "string",
  //     address: "宁波莫干山路123号",
  //     contact: "张三",
  //     phone: "0574-87155701",
  //     createdAt: "2019-08-24T14:15:22Z",
  //     updatedAt: "2019-08-24T14:15:22Z",
  //   },
  // };
  return response.data;
};
/**
 * admin / orgAdmin / orgStuff
 * @param {*} OrganizationId
 * @param {*} token
 * @returns
 */
export const GetOneOrganization = async (OrganizationId) => {
  const response = await axios.get(
    `${API_URL}/organizations/${OrganizationId}`
  );
  return response.data;
};
/**
 * admin
 * @param {*} OrganizationId
 * @param {*} token
 * @param {*} data
 * @returns
 */
export const UpdateOneOrganization = async (OrganizationId, data) => {
  // const response = await axios.put(
  //   `${API_URL}/organizations/${OrganizationId}`
  // );
  const response = {
    data: data,
  };
  return response.data;
};

/**
 * admin
 * @param {*} OrganizationId
 * @param {*} token
 * @returns
 */
export const DeleteOneOrganization = async (OrganizationId, ) => {
  const response = await axios.delete(
    `${API_URL}/organizations/${OrganizationId}`
  );
  console.log(response.data);
  return response.data;
};
