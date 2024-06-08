import { useState, useContext, useRef, useEffect } from "react";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";

import { Cell } from "@arco-design/mobile-react";

import "@/styles/home.less";
import { ReactComponent as OrganizationIcon } from "@/assets/icon/organization.svg";
import { ReactComponent as UserIcon } from "@/assets/icon/user.svg";
import { ReactComponent as ProduIcon } from "@/assets/icon/pruduction.svg";
import { ReactComponent as DeviceIcon } from "@/assets/icon/device.svg";
import { ReactComponent as NormalIcon } from "@/assets/icon/normal.svg";
import { ReactComponent as NotWorkIcon } from "@/assets/icon/notwork.svg";
import { ReactComponent as ProduNormalIcon } from "@/assets/icon/productNormal.svg";
import { ReactComponent as WrongIcon } from "@/assets/icon/wrong.svg";
import MyToast from "@/components/Toast/toast";
import {
  GetStatsByWebAdmin,
  GetStatsOfCust,
  GetStatsOfOrg,
} from "@/services/Statistic";

export function OrganizationStatistic() {
  //* 组织的数据
  const [statis, setStatis] = useState({});

  const { current_Organization, OrganizationList, setOrganizationList } =
    useContext(OrganizationContext);
  //获取到设置的状态
  const { authState } = useContext(AuthContext);
  const token = authState.token;
  const role = authState.user===null ? -10 : authState.user.roles[0].role / 10;
  useEffect(() => {
    //* 获取总体首页statis
    //管理员
    if (role === 0)
      GetStatsByWebAdmin(token).then((data) => {
        setStatis(data);
      }).catch(error=>{
        MyToast("error","获取数据失败")
      });
    //组织用户
    else if (role  === 1) {
      GetStatsOfOrg(token).then((data) => {
        setStatis(data);
      }).catch(error=>{
        MyToast("error","获取数据失败")
      });
      //产品用户
    } else {
      GetStatsOfCust(token).then((data) => {
        setStatis(data);
      }).catch(error=>{
        MyToast("error","获取数据失败")
      });
    }
  }, []);

  let production = new Array(4).fill(0);
  let device = new Array(4).fill(0);

  //* 渲染首页数据
  if ("product" in statis && "device" in statis) {
    statis.product.map((e) => {
      return (production[e.status] = e.num);
    });
    statis.device.map((e) => {
      device[e.status] = e.num;
    });
  }

  let son1 = <></>;
  let son2 = <></>;
  if (role === 0) {
    son1 = (
      <>
        <Cell
          label={<OrganizationIcon />}
          bordered={false}
          className="myCell content"
        >
          <div>
            <span>组织</span>
            <div className="cellText">{statis.organization}</div>
          </div>
        </Cell>
        <Cell
          // icon={<UserIcon></UserIcon>}
          label={<UserIcon></UserIcon>}
          bordered={false}
          className="myCell content"
        >
          <div>
            客户
            <div className="cellText">{statis.customer}</div>
          </div>
        </Cell>
      </>
    );
  } else if (role === 1) {
    son2 = (
      <Cell
        // icon={<UserIcon></UserIcon>}
        label={<UserIcon></UserIcon>}
        bordered={false}
        className="myCell content"
      >
        <div>
          客户
          <div className="cellText">{statis.customer}</div>
        </div>
      </Cell>
    );
  }

  return (
    <>
      <Cell.Group>
        {son1}
        {son2}
        <Cell
          // icon=
          label={<ProduIcon></ProduIcon>}
          bordered={false}
          className="myCell content"
        >
          <div>
            <div style={{ textAlign: "right" }}>产品</div>
            <div className="cellIconAndText">
              <ProduNormalIcon className="cellTextIcon"></ProduNormalIcon>
              <span className="">{production[1]}</span>
              <WrongIcon className="cellTextIcon"></WrongIcon>
              <span className="">{production[2]}</span>
            </div>
          </div>
        </Cell>
        <Cell
          label={<DeviceIcon></DeviceIcon>}
          bordered={false}
          className="myCell content"
        >
          <div>
            <div style={{ textAlign: "right" }}>设备</div>
            <div className="cellIconAndText">
              <NormalIcon className="cellTextIcon"></NormalIcon>
              <span className="">{production[1]}</span>
              <NotWorkIcon className="cellTextIcon"></NotWorkIcon>
              <span className="">{production[2]}</span>
              <WrongIcon className="cellTextIcon"></WrongIcon>
              <span>{production[3]}</span>
            </div>
          </div>
        </Cell>
      </Cell.Group>
    </>
  );
}

//   let StatisticMap = Object.keys(statis).map((label, index) => {
//     return (
//       <Cell
//         label={labelIcons[startIndex]}
//         bordered={false}
//         className="myCell content"
//       >
//         <div>
//           <span>{label}</span>
//           <div className="cellText">{statis[label]}</div>
//         </div>
//       </Cell>
//     );
//   });
