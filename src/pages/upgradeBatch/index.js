import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";

import {
  CreateUB,
} from "@/services/upgradeBatch";
import {
  Button,
  Cell,
  DropdownMenu,
  Steps,
  DatePicker,
  PopupSwiper,
  Checkbox,
} from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FirmwareContext } from "@/context/firmware";
import ReturnButton from "@/components/TopBar/return";
import * as Time from "@/components/function/time_2";
import { GetDiviceList } from "@/services/device";
import {
  IconClose,
  IconSuccessCircle,
} from "@arco-design/mobile-react/esm/icon";
import CellNodata from "@/components/InfoList/lackData";

export default function UpgradeBatch() {
  const { currentFirmware } = useContext(FirmwareContext);
  const { currentProduct } = useContext(ProductContext);
  const { productId, firmwareId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [response, setResponse] = useState({});
  const [timePickerValue, setTimePickerValue] = useState(
    new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
  );
  const [strategy, setStrategy] = useState({
    type: 1,
    status: 1,
    scope: 1,
    scheduleType: 1,
  });
  const navigate = useNavigate();

  const items = [
    {
      title: "配置升级范围",
    },
    {
      title: "配置升级策略",
    },
    {
      title: "完成",
    },
  ];

  return (
    <>
      <MyTopBar
        LeftChildren={
          <ReturnButton
            navigate={() =>
              navigate(`/product/${productId}/firmware/${firmwareId}`)
            }
          ></ReturnButton>
        }
      ></MyTopBar>
      <Steps
        items={items}
        current={currentIndex}
        onClick={(index) => console.log(index)}
      ></Steps>
      {currentIndex === 0 ? (
        <UpgradeRange
          currentIndex={currentIndex}
          strategy={strategy}
          setStrategy={setStrategy}
        />
      ) : (
        <></>
      )}
      {currentIndex === 1 ? (
        <UpgradeTime
          strategy={strategy}
          setStrategy={setStrategy}
          timePickerValue={timePickerValue}
          setTimePickerValue={setTimePickerValue}
        />
      ) : (
        <></>
      )}
      {currentIndex === 2 ? (
        <>
          <Finish response={response} setResponse={setResponse}></Finish>
        </>
      ) : (
        <></>
      )}
      <BottomButton
        strategy={strategy}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      ></BottomButton>
    </>
  );
}
function Finish({ response, setResponse }) {
  const { productId, firmwareId } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <div className="upgrade-title">
        <IconSuccessCircle color="green"></IconSuccessCircle>
        <span>已完成创建</span>
      </div>
      <div className=" twobutton-div">
        <Button className="two-button-button" onClick={()=> navigate(`/product/${productId}/firmware/${firmwareId}/upgradebatch/${response.id}`)}>查看更新详情</Button>
        <Button
          className="two-button-button"
          onClick={() =>
            navigate(`/product/${productId}/firmware/${firmwareId}`)
          }
        >
          查看固件
        </Button>
      </div>
    </div>
  );
}
function BottomButton({ strategy, setCurrentIndex, currentIndex }) {
  const { productId, firmwareId } = useParams();

  if (currentIndex === 2)
    CreateUB(productId, firmwareId, strategy).then((data) => {
      MyToast("success", "创建成功");
      // navigate(`/product/${productId}/firmware/${firmwareId}`);
    }).catch(error=>{
      MyToast("error","新建失败")
    });
  return (
    <div
      style={{
        display: "flex",
        bottom: 0,
        position: "absolute",
        width: "100%",
      }}
    >
      {currentIndex > 0 ? (
        <Button onClick={() => setCurrentIndex(currentIndex - 1)}>
          上一步
        </Button>
      ) : (
        <></>
      )}
      <Button
        onClick={() => {
          if (currentIndex === 1 && strategy.scheduleType === 2) {
            const currentTimestamp = Date.now(); // 获取当前时间戳
            const timeDiff =
            Time.IsoToTimestamp(strategy.startTime) - currentTimestamp;
            // 将时间间隔转换为天数
            const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // 1天 = 1000毫秒 * 60秒 * 60分钟 * 24小时
            // 判断时间间隔是否不少于7天
            if (daysDiff <= 7 && daysDiff >= 0) {
              setCurrentIndex(currentIndex + 1);
            } else {
              MyToast("warn", "创建失败：开始时间必须在未来7天内");
            }
          } else setCurrentIndex(currentIndex + 1);
        }}
      >
        {currentIndex < 1 ? "下一步" : "完成"}
      </Button>
    </div>
  );
}

function findIndexes(idArray, objectArray) {
  return idArray.map((id) => {
    const index = objectArray.findIndex((obj) => obj.id === id);
    return index;
  });
}
function UpgradeRange({ currentIndex, strategy, setStrategy }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [selectDeviceList, setSelectDeviceList] = useState([]);
  const { productId, firmwareId } = useParams();
  console.log(strategy);
  useEffect(() => {
    if (currentIndex === 0 && popupVisible) {
      GetDiviceList(productId).then((data) => {
        setDeviceList(data);
        //* 假设升级范围传送的是deviceList
        // setStrategy({ ...strategy, deviceList: [] });
      }).catch(error=>{
        MyToast("error","获取设备列表失败")
      });
    }
  }, [currentIndex, popupVisible]);
  useEffect(() => {
    if (strategy.scope === 1 && "deviceList" in strategy) {
      let temp = { ...strategy };
      delete temp["deviceList"];
      setStrategy({ ...temp });
    }
  }, [strategy.scope]);
  let deviceListCheckBox = deviceList.map((data, idx) => {
    return (
      <Checkbox value={idx} className="checkbox">
        {data.name}
      </Checkbox>
    );
  });
  const selectAll = selectDeviceList.length === deviceList.length;
  //* 勾选的设备
  const defaultValue = findIndexes(selectDeviceList, deviceList);
  const handleDelSelect = (deviceId) => {
    const updatedDeviceList = strategy.deviceList.filter(
      (id) => id !== deviceId
    );
    setStrategy({ ...strategy, deviceList: updatedDeviceList });
  };
  let selectDeviceListMap =
    "deviceList" in strategy &&
    deviceList.map((data, idx) => {
      console.log(strategy.deviceList);
      if (strategy.deviceList.includes(data.id))
        return (
          <Cell key={idx} label={data.name}>
            <IconClose onClick={() => handleDelSelect(data.id)}></IconClose>
          </Cell>
        );
      else {
        return <></>;
      }
    });
  // false.length为undefined,也通不过检查
  if (selectDeviceListMap === false || selectDeviceListMap.length === 0) {
    selectDeviceListMap = <CellNodata></CellNodata>;
  }
  console.log(selectDeviceListMap);
  return (
    <>
      <DropdownMenu
        required
        selectTips={["升级范围"]}
        options={[
          { label: "全部设备", value: 1 },
          { label: "定向升级", value: 2 },
        ]}
        onOptionClick={(e) => {
          setStrategy({ ...strategy, scope: e });
          console.log(e);
          // console.log(strategy);
        }}
      ></DropdownMenu>
      <SelectDeviceList deviceList={deviceList}></SelectDeviceList>
      {strategy.scope === 2 ? (
        //* 设备列表
        <>
          <Cell
            label="请选择设备"
            onClick={() => setPopupVisible(!popupVisible)}
            showArrow
          ></Cell>
          {selectDeviceListMap}
          <PopupSwiper
            visible={popupVisible}
            selectTips={["设备范围"]}
            options={["全部设备", "定向升级"]}
            onOptionClick={(e) => {
              setStrategy({ ...strategy, scope: e + 1 });
              console.log(e + 1);
            }}
            direction="right"
            close={() => setPopupVisible(!popupVisible)}
          >
            <Cell className="popup-title">请选择设备</Cell>
            <Button
              inline
              size="medium"
              onClick={() => {
                if (selectDeviceList.length === deviceList.length) {
                  setSelectDeviceList([]);
                } else {
                  //* 把所有的deviceId放进来
                  let temp = deviceList.map((data) => {
                    return data.id;
                  });
                  setSelectDeviceList(temp);
                }
              }}
            >
              {selectAll ? "Deselect all" : "Select all"}
            </Button>
            <Checkbox.Group
              layout="block"
              value={defaultValue}
              onChange={(value) => {
                setSelectDeviceList(value);
              }}
            >
              {deviceListCheckBox}
            </Checkbox.Group>
            <Button
              style={{ position: "absolute", bottom: 0 }}
              onClick={() => {
                setStrategy({ ...strategy, deviceList: selectDeviceList });
                setPopupVisible(!popupVisible);
              }}
            >
              确认选择
            </Button>
          </PopupSwiper>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
function SelectDeviceList({ deviceList }) {
  deviceList.map((data, idx) => {
    return <Cell label={data.name}>{data.deviceKey}</Cell>;
  });
}
function UpgradeTime({ strategy, setStrategy }) {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerValue, setPickerValue] = useState(null);
  console.log(strategy);
  return (
    <>
      <DropdownMenu
        required
        selectTips={["升级时间"]}
        options={["立即升级", "定时升级"]}
        onOptionClick={(e) => {
          setStrategy({ ...strategy, scheduleType: e + 1 });
          //* 当选择立即升级时，将startTime删掉
          if (e === 0 && "startTime" in strategy) {
            let temp = { ...strategy };
            delete temp.startTime;
            setStrategy({ ...temp });
          }
        }}
      ></DropdownMenu>
      {strategy.scheduleType === 2 ? (
        <Cell
          showArrow
          label="升级开始时间"
          onClick={() => {
            setPickerVisible(true);
          }}
        >
          {Time.timestampToChinaNormal(pickerValue)}
        </Cell>
      ) : (
        <></>
      )}
      <DatePicker
        visible={pickerVisible}
        typeArr={["year", "month", "date", "hour", "minute"]}
        maskClosable
        disabled={false}
        currentTs={strategy.startTime}
        onHide={() => {
          setPickerVisible(false);
        }}
        onOk={(timestamp, obj) => {
          console.info("---demo on change index", timestamp);
          setPickerValue(timestamp);
          setStrategy({
            ...strategy,
            startTime: Time.normalToISO(Time.timestampToChinaNormal(timestamp)),
          });
        }}
      >
        选择时间
      </DatePicker>
    </>
  );
}

