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
 * admin / orgAdmin / orgStuff
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns [list]
 */
export const ListCustormersOfProd = async (productId) => {

    var Url = `${API_URL}/custormer?productId=${productId}`;
    // const response = await axios.get(Url);
    const response = {
      data: [
        {
          id: "6bd185f99fb725b27d8edc12",
          name: "浙江华港染织有限公司",
          description: "浙江华港染织有限公司",
          address: "台州中山路123号",
          contact: "李经理",
          phone: "0594-69001200",
        },
        {
          id: "6bd185f99fb725b27d8edc123",
          name: "吉利控股集团",
          description: "吉利控股集团",
          address: "台州中山路123号",
          contact: "李经理",
          phone: "0594-69001200",
        },
        {
          id: "6bd185f99fb725b27d8edc124",
          name: "浙江物产集团",
          description: "浙江物产集团",
          address: "台州中山路123号",
          contact: "李经理",
          phone: "0594-69001200",
        },
      ],
    };
    return response.data;

};
/**
 * admin / orgAdmin / orgStaff
 * @param {*} token
 * @param {*} customerId 查询的客户id
 * @returns
 */
export const GetOneCust = async (customerId) => {

    var Url = `${API_URL}/custormer/${customerId}`;
    // const response = await axios.get(Url);
    const response = {
      data: {
        id: "6bd185f99fb725b27d8edc12",
        name: "浙江华港染织有限公司",
        description: "string",
        address: "台州中山路123号",
        contact: "李经理",
        phone: "0594-69001200",
      },
    };
    return response.data;

};
/**
 * admin
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns
 */
export const UpdateCustormer = async (customerId = "", newData) => {

    var Url = `${API_URL}/custormer/${customerId}`;
    // const response = await axios.put(Url,newData);
    const response = {
      data: newData,
    };
    return response.data;

};
/**
 * admin / orgAdmin
 * @param {*} data
 * @param {*} organizationId
 * @param {*} customerId
 * @param {*} token
 * @returns
 */
export const AddCustormer = async (data, productId = "") => {
    console.log(data);
    var Url = `${API_URL}/product/${productId}/custormer`;
    console.log(Url);
    // const response = await axios.post(Url, data);
    const response = {
      data: data,
    };
    // console.log(response.data);
    return response.data;

};

/**
 * remove a custormer from a product
 * admin / orgAdmin
 * @param {*} token
 * @param {*} productId
 * @param {*} customerId
 * @returns
 */
export const DelCustormer = async (productId, customerId) => {

    var Url = `${API_URL}/product/${productId}/custormer/${customerId}`;

    console.log(Url);
    // const response = await axios.del(Url,data);

    const response = {
      status: 200,
      data: { data: "Yes" },
    };
    // response.data.id = customerId
    // console.log(response.data);
    return response.data;

};
