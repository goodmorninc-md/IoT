import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";

import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";

import FindButton from "./lookup";
import ReactECharts from "echarts-for-react";
import * as Product from "@/services/Product";
import data from "./testData";
import GetTime from "@/components/function/time";
import MyToast from "@/components/Toast/toast";
export default function HistoryData() {
  const [searchData, setSearchData] = useState({ queries: [], tags: {} });
  const [searchDataLabel, setSearchDataLabel] = useState("");
  const { currentProduct } = useContext(ProductContext);
  const [chartsData, setChartsData] = useState([]);
  const [lookStatus, setLookStatus] = useState(false);
  function handleLookup() {
    if (
      "start" in searchData &&
      "end" in searchData &&
      "queries" in searchData
    ) {
      console.log(searchData);
      Product.QueryTimeSeriesData("", currentProduct.id, "", searchData)
        .then((data) => {
          console.log(data);
          setChartsData(data);
          setLookStatus(true);
        })
        .catch((error) => {
          MyToast("error", "查询失败");
        });
    }
  }
  return (
    <>
      <FindButton
        searchData={searchData}
        setSearchData={setSearchData}
        handleLookup={handleLookup}
        searchDataLabel={searchDataLabel}
        setSearchDataLabel={setSearchDataLabel}
      ></FindButton>
      {lookStatus ? (
        <MyChart searchData={searchData} chartsData={data}></MyChart>
      ) : (
        <></>
      )}
    </>
  );
}
const MyChart = ({ searchData, chartsData }) => {
  if (chartsData.length > 0) {
    let xLabels = [];
    let yLabels = {};
    if (data.length > 0) {
      Object.keys(data[0]).map((key) => {
        if (key !== "time") yLabels[key] = [];
      });
    }
    let dataChart = data.map((data) => {
      let t = GetTime(data.time);
      return [t, data.plc0];
    });
    let timeInterval = parseInt(dataChart.length / 20);
    const option = {
      // title: {
      //   text: "历史数据",
      //   left: "left",
      //   textStyle: {
      //     fontSize: "1rem", // 设置标题字体大小
      //   },
      // },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: "{c}°C",
        textStyle: {
          fontSize: "1rem", // 设置提示框字体大小
        },
      },
      legend: {
        data: yLabels.keys,
        type: "scroll", // 启用滚动条
        selected: {
          PLC0: true, // 初始显示 PLC0
          PLC1: false, // 初始不显示 PLC1
        },
        textStyle: {
          fontSize: "0.3rem", // 设置图例字体大小
        },
      },
      grid: {
        left: "10%",
        right: "4%",
        bottom: "18%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        name: "时间",
        nameLocation: "end", // 单位的位置，可选值为'start', 'middle', 'end'
        nameTextStyle: {
          fontSize: 14, // 设置单位标签的字体大小
          color: "#333", // 设置单位标签的颜色
        },

        axisLabel: {
          fontSize: "0.3rem", // 设置X轴标签字体大小
          rotate: 45, // 旋转标签
          interval: timeInterval,
        },
        // boundaryGap: ['20%', '20%'], // 设置两端的间距
      },
      yAxis: {
        // type: "value",
        axisLabel: {
          formatter: `{value} `,
          fontSize: "0.3rem", // 设置Y轴标签字体大小
        },
      },
      series: searchData.queries.map((data) => {
        return {
          type: "line",
          data: dataChart,
          name: data.field,
        };
      }),
      dataZoom: [
        {
          type: "inside",
          start: 0,
          end: 100,
        },
        {
          type: "slider",
          start: 0,
          end: 100,
        },
      ],
    };
    return (
      <div style={{ width: "100%", height: "10rem", marginTop: "1rem" }}>
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
        />
      </div>
    );
  }
  return <></>;
};
