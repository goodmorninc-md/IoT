import axios from "axios";
import { API_URL, token } from "./Data";
import MyToast from "@/components/Toast/toast";
//设置全局配置
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

//* 获取组织首页数据
/**
 *
 * @param {*} token
 * @returns 返回整体数据
 */
export const GetStatsByWebAdmin = async (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // const response = await axios.get(`${API_URL}/stats`);
  const response = {
    status: 200,
    data: {
      organization: 2,
      customer: 4,
      product: [
        {
          status: 2,
          num: 1,
        },
        {
          status: 3,
          num: 2,
        },
        {
          status: 1,
          num: 4,
        },
      ],
      device: [
        {
          status: 1,
          num: 7,
        },
      ],
    },
    device: [
      {
        status: 1,
        num: 7,
      },
    ],
  };
  return response.data;
};
/**
 * 获取某个组织的信息
 * permission:admin/ orgAdmin/ orgStuff
 * @param {*} token
 * @param {*} orgnizationId 特定组织信息
 * @returns 数据信息，无组织数
 */
//* 获取组织首页数据
export const GetStatsOfOrg = async (token, orgnizationId) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // const response = await axios.get(`${API_URL}/organization/${orgnizationId}/stats`);
  const response = {
    status: 200,
    data: {
      organization: 2,
      customer: 4,
      product: [
        {
          status: 2,
          num: 1,
        },
        {
          status: 3,
          num: 2,
        },
        {
          status: 1,
          num: 4,
        },
      ],
      device: [
        {
          status: 1,
          num: 7,
        },
      ],
    },
    device: [
      {
        status: 1,
        num: 7,
      },
    ],
  };
  return response.data;
};

//* 获取组织首页数据
/**
 * permission admin/ custAdmin / custStaff
 * @param {*} token
 * @param {productID} 产品的id
 * @returns product and device
 */
export const GetStatsOfCust = async (token, productID) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // const response = await axios.get(`${API_URL}/stats`);
  const response = {
    status: 200,
    data: {
      organization: 2,
      customer: 4,
      product: [
        {
          status: 2,
          num: 1,
        },
        {
          status: 3,
          num: 2,
        },
        {
          status: 1,
          num: 4,
        },
      ],
      device: [
        {
          status: 1,
          num: 7,
        },
      ],
    },
    device: [
      {
        status: 1,
        num: 7,
      },
    ],
  };
  return response.data;
};
