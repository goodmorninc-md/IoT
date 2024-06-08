import MyTopBar from "@/components/TopBar/TopBar";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import {
  Button,
  Cell,
  PopupSwiper,
  DatePicker,
} from "@arco-design/mobile-react";
import { GetStatsOfInc, ListInc, GetOneInc } from "@/services/incident";
import { ProductContext } from "@/context/Product";
import Popover from "@/components/Popover/Popover";
import { ReactComponent as FindIcon } from "@/assets/icon/find.svg";
import { bgColor } from "@/styles/buttonColorConfig";
import CellNodata from "@/components/InfoList/lackData";
import * as Time from "@/components/function/time_2";
import MyToast from "@/components/Toast/toast";
export default function Incident({ currentTab }) {
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  const [incidentList, setIncidentList] = useState([]);

  return (
    <>
      <Cell.Group>
        {currentProduct.id && <Statis currentTab={currentTab}></Statis>}
      </Cell.Group>
      {/* <div className={"alert-title"}>告警事件</div> */}
      <SearchPopup
        currentTab={currentTab}
        incidentList={incidentList}
        setIncidentList={setIncidentList}
      ></SearchPopup>
      <IncidentList
        incidentList={incidentList}
        setIncidentList={setIncidentList}
      ></IncidentList>
    </>
  );
}
function SearchPopup({ currentTab, incidentList, setIncidentList }) {
  const [picker1Visible, setPicker1Visible] = useState(false);
  const [picker2Visible, setPicker2Visible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  let disabled = false;
  if (start > end && currentTab === 0) {
    MyToast("warn", "起始时间必须在终止时间前");
    disabled = true;
  }
  function handleSearch() {
    if (currentTab === 0 && start.length > 0 && end.length > 0) {
      ListInc(current_Organization.id, "", currentProduct.id, "", start, end)
        .then((data) => {
          setIncidentList(data);
          setVisible(!visible);
        })
        .catch((error) => {
          MyToast("error", "获取告警事件列表失败");
        });
    }
  }
  return (
    <>
      <PopupSwiper
        direction="right"
        exitDirection={["right", "bottom"]}
        visible={visible}
        close={() => setVisible(!visible)}
      >
        <div className="more-space">
          <Cell
            showArrow
            label="起始时间"
            onClick={() => {
              setPicker1Visible(true);
            }}
          >
            {Time.UTCtoNormal(start)}
          </Cell>
          <Cell
            showArrow
            label="终止时间"
            onClick={() => {
              setPicker2Visible(true);
            }}
          >
            {Time.UTCtoNormal(end)}
          </Cell>
          <DatePicker
            visible={picker1Visible}
            typeArr={["year", "month", "date", "hour", "minute"]}
            maskClosable
            disabled={false}
            currentTs={start}
            onHide={() => {
              setPicker1Visible(false);
            }}
            onOk={(timestamp) => {
              // setPicker1Value(timestamp);
              setStart(Time.convertTimestampToUTC(timestamp));
            }}
          />
          <DatePicker
            visible={picker2Visible}
            typeArr={["year", "month", "date", "hour", "minute"]}
            maskClosable
            disabled={false}
            currentTs={end}
            onHide={() => {
              setPicker2Visible(false);
            }}
            onOk={(timestamp) => {
              // setPicker2Value(timestamp);
              setEnd(Time.convertTimestampToUTC(timestamp));
            }}
          ></DatePicker>
          <Button
            icon={<FindIcon className="iconInfo"></FindIcon>}
            bgColor={bgColor}
            color="blue"
            onClick={handleSearch}
            className="tab-under-button"
            disabled={disabled}
          >
            查找
          </Button>
        </div>
      </PopupSwiper>
      <Button
        onClick={() => setVisible(!visible)}
        icon={<FindIcon className="iconInfo"></FindIcon>}
        color="blue"
        className="tab-under-button"
        bgColor={bgColor}
      >
        查找
      </Button>
    </>
  );
}
function Statis({ currentTab }) {
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  const [statis, setStatis] = useState([]);
  useEffect(() => {
    if (currentTab === 0) {
      // console.log(1);
      GetStatsOfInc(current_Organization.id, currentProduct.id)
        .then((data) => {
          setStatis(data);
        })
        .catch((error) => {
          MyToast("error", "获取告警数据失败");
        });
    }
  }, [currentTab]);
  const statusList = ["", "未解决", "已确认", "已解决"];
  const popupInfo = [
    "未解决事件的数量",
    "已确认事件的数量",
    "已解决事件的数量",
  ];
  const statisClass = ["sta-not-done", "sta-confirm", "sta-solved"];
  // console.log(statis);
  const statisMap =
    statis &&
    statis.map((data, idx) => {
      //* here
      return (
        <Cell
          // prepend={"描述"}
          bordered={false}
          className="alert-cell"
          label={
            <div style={{ display: "flex" }}>
              {statusList[data.status]}
              <Popover
                content={popupInfo[idx]}
                direction="bottomCenter"
              ></Popover>
            </div>
          }
        >
          <span className={statisClass[idx]}>{data.num}</span>
        </Cell>
      );
    });
  return <>{statisMap}</>;
}

function IncidentList({ incidentList, setIncidentList }) {
  return <TrList incidentList={incidentList}></TrList>;
}
function TrList({ incidentList }) {
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  const statusList = ["", "未解决", "已确认", "已解决"];
  const [incidentDetail, setIncidentDetail] = useState({});
  const [visible, setVisible] = useState(false);
  function handleLook(incidentId) {
    GetOneInc(incidentId)
      .then((data) => {
        setIncidentDetail(data);
      })
      .catch((error) => {
        MyToast("error", "获取事件详情失败");
      });
    setVisible(!visible);
  }
  const child = incidentList.map((data, idx) => {
    return (
      <Cell
        label={<span style={{ color: "black" }}>{data.entityId}</span>}
        onClick={() => handleLook(data.id)}
        text={statusList[data.status]}
        showArrow
        bordered={false}
      ></Cell>
    );
  });

  incidentList.map((data, idx) => {
    return (
      <Fragment key={idx}>
        <tr>
          <td>
            {data.entityId}
            <Button onClick={() => handleLook(data.id)} className="tr-button">
              查看
            </Button>
          </td>
          <td>{statusList[data.status]}</td>
        </tr>
      </Fragment>
    );
  });
  let detail =
    Object.keys(incidentDetail).length === 0 ? (
      <></>
    ) : (
      <>
        <Cell className="popup-title">告警事件信息</Cell>
        <Cell label={<>EntityId</>}>{incidentDetail.entityId}</Cell>
        <Cell label="状态">{statusList[incidentDetail.status]}</Cell>
        <Cell label="告警次数">{incidentDetail.numAlerts}</Cell>
        <Cell label="创建时间">{formatDate(incidentDetail.createdAt)}</Cell>
        <Cell label="确认人">
          {incidentDetail.status === 2 || incidentDetail.status === 3
            ? incidentDetail.ackBy.fullName
            : "尚未确认"}
        </Cell>
        <Cell label="解决人">
          {incidentDetail.status === 3
            ? incidentDetail.resolvedBy.fullName
            : "尚未解决"}
        </Cell>
      </>
    );
  return (
    <>
      {child.length != 0 ? child : <CellNodata></CellNodata>}
      <PopupSwiper
        contentStyle={{ borderRadius: "10px 10px 0 0" }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
        visible={visible}
        close={() => setVisible(!visible)}
      >
        {detail}
      </PopupSwiper>
    </>
  );
}

function formatDate(isoString) {
  // 使用Date对象解析ISO格式的日期字符串
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // 返回格式化的日期字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function ToUtcTime(timestamp) {
  const date = new Date(timestamp);

  // 使用toISOString()方法转换为ISO 8601格式的字符串
  // 然后截取字符串，只保留到秒的部分
  return date.toISOString().slice(0, 19).replace("T", " ");
}
