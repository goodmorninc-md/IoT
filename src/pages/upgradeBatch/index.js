import { ProductContext } from "@/context/Product";
import { Fragment, useContext, useEffect, useState } from "react";
import {
  GetFirmwareList,
  CreateFirmware,
  ShowDetailOfFirmware,
  UpdateFirmware,
  DelFirmware,
} from "@/services/firmware";
import {
  ListAllUbOfFirmware,
  CreateUB,
  ShowDetailOfUB,
  DelUB,
} from "@/services/upgradeBatch";
import {
  Button,
  Cell,
  DropdownMenu,
  Steps,
  DatePicker,
} from "@arco-design/mobile-react";
import "@/styles/mapping.less";
import MyToast from "@/components/Toast/toast";
import MyTopBar from "@/components/TopBar/TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { FirmwareContext } from "@/context/firmware";

export default function UpgradeBatch() {
  const { currentFirmware } = useContext(FirmwareContext);
  const { currentProduct } = useContext(ProductContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pickerVisible, setPickerVisible] = useState(false);
  const location = useLocation();
  const url = window.location.href;
  const list = url.split("/");
  console.log(url)
  const productId = list[4];
  const firmwareId = list[6];
  console.log(productId, firmwareId);

  const [pickerValue, setPickerValue] = useState(
    new Date("2024-05-10 10:10:08".replace(/-/g, "/")).getTime()
  );
  const [strategy, setStrategy] = useState({
    type: 1,
    status: 1,
    scope: 1,
    scheduleType: 1,
  });
  const navigate = useNavigate();
  if (currentIndex === 2)
    CreateUB(productId,firmwareId,strategy).then(data=>{
      MyToast("success","创建成功")
      navigate(
        `/product/${productId}/firmware/${firmwareId}`
      );
  })
    
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
  //   useEffect();
  let son0 = (
    <>
      <DropdownMenu
        required
        options={["全部设备", "定向升级"]}
        onOptionClick={(e) => {
          setStrategy({ ...strategy, score: e + 1 });
        }}
      ></DropdownMenu>
      {strategy.scope === 2 ? <div>设备范围</div> : <></>}
    </>
  );
  let son1 = (
    <>
      <DropdownMenu
        required
        options={["立即升级", "定时升级"]}
        onOptionClick={(e) => {
          setStrategy({ ...strategy, scheduleType: e + 1 });
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
          {new Date(pickerValue).toLocaleString("zh-CN", { hour12: false })}
        </Cell>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <>
      <MyTopBar
        LeftChildren={<Button onClick={() => navigate(`/product/`)}></Button>}
      ></MyTopBar>
      <Steps
        items={items}
        current={currentIndex}
        onClick={(index) => console.log(index)}
      ></Steps>
      {currentIndex === 0 ? son0 : <></>}
      {currentIndex === 1 ? son1 : <></>}
      {currentIndex > 0 ? (
        <Button onClick={() => setCurrentIndex(currentIndex - 1)}>
          上一步
        </Button>
      ) : (
        <></>
      )}
      <Button
        onClick={() => {
          if (currentIndex === 1) {
            const currentTimestamp = Date.now(); // 获取当前时间戳
            const timeDiff = pickerValue - currentTimestamp;
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

      <DatePicker
        visible={pickerVisible}
        typeArr={["year", "month", "date", "hour", "minute"]}
        maskClosable
        disabled={false}
        currentTs={pickerValue}
        onHide={() => {
          setPickerVisible(false);
        }}
        onChange={(timestamp, obj) => {
          console.info("---demo on change index", timestamp);
          setPickerValue(timestamp);
          console.log(new Date(timestamp).toISOString());
        }}
      >
        选择时间
      </DatePicker>
    </>
  );
}
