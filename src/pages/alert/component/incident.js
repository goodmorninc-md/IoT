import MyTabBar from "@/components/TabBar/TabBar";
import MyTopBar from "@/components/TopBar/TopBar";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { Button, Cell, PopupSwiper } from "@arco-design/mobile-react";
import {
  GetStatsOfInc,
  ListInc,
  GetOneInc,
  AcknowLedgeOrResInc,
} from "@/services/incident";
import MyToast from "@/components/Toast/toast";
import MyDropDown from "@/components/Dropdown/dropdown";
import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";
import Popover from "@/components/Popover/Popover";

import { IconQuestionCircle } from "@arco-design/mobile-react/esm/icon";
export default function Incident({ currentTab }) {
  return (
    <>
      <Cell.Group>
        <Statis currentTab={currentTab}></Statis>
      </Cell.Group>
      <div className={"alert-title"}>告警事件</div>
      <IncidentList currentTab={currentTab}></IncidentList>
    </>
  );
}

function Statis({ currentTab }) {
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  const [statis, setStatis] = useState([]);
  useEffect(() => {
    if (currentTab === 0) {
      GetStatsOfInc(current_Organization.id, currentProduct.id).then((data) => {
        setStatis(data);
      });
    }
  }, [currentTab]);
  const statusList = ["", "未解决", "已确认", "已解决"];
  const statisMap = statis.map((data, idx) => {
    return (
      <Cell
        // prepend={"描述"}
        bordered={false}
        className="alert-cell"
        label={
          <div className="cellIconAndText">
            {statusList[data.status]}
            <Popover content={"该组织所有客户数量"} direction="bottomCenter">
              <IconQuestionCircle className="iconInfoFpage"></IconQuestionCircle>
            </Popover>
          </div>
        }
      >
        {data.num}
      </Cell>
    );
  });
  return <>{statisMap}</>;
}

function IncidentList({ currentTab }) {
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  const [incidentList, setIncidentList] = useState([]);

  useEffect(() => {
    if (currentTab === 0) {
      ListInc(current_Organization.id).then((data) => {
        setIncidentList(data);
      });
    }
  }, [currentTab]);

  return (
    <table className="table">
      <thead className="TrTable">
        <tr>
          <th>EntityId</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <TrList incidentList={incidentList}></TrList>
      </tbody>
    </table>
  );
}
function TrList({ incidentList }) {
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  const statusList = ["", "未解决", "已确认", "已解决"];
  const [incidentDetail, setIncidentDetail] = useState({});
  const [visible, setVisible] = useState(false);
  function handleLook(incidentId) {
    GetOneInc(incidentId).then((data) => {
      setIncidentDetail(data);
    });
    setVisible(!visible);
  }
  const child = incidentList.map((data, idx) => {
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
      {child}
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
