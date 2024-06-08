import MyTopBar from "@/components/TopBar/TopBar";
import { useState, useContext, useRef, useEffect, Fragment } from "react";

import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { ProductContext } from "@/context/Product";
import {
  Button,
  Input,
  Cell,
  PopupSwiper,
  Tabs,
} from "@arco-design/mobile-react";
import MyToast from "@/components/Toast/toast";
import MyDropDown from "@/components/Dropdown/dropdown";
import { useNavigate } from "react-router-dom";
import Select from "@/components/select/select";
//* 获取变量列表
import {
  GetAlertRules,
  ShowDetailOfAR,
  updateAR,
  DelAR,
} from "@/services/alertrule";
import { bgColor, delButtonbgColor } from "@/styles/buttonColorConfig";
import DialogDemo from "@/components/Popover/delConfirm";
export default function AlertRule({}) {
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  // const [create_edit, setCreate_edit] = useState(0);
  const [AlertRuleList, setAlertRuleList] = useState([]);

  const [currentSelect, setCurrentSelect] = useState("");
  useEffect(() => {
    if (currentProduct.id) {
      GetAlertRules(currentProduct.id)
        .then((data) => {
          setAlertRuleList(data);
        })
        .catch((error) => {
          MyToast("获取告警规则列表失败");
        });
    }
  }, [currentProduct, currentSelect]);
  // onClick={() => setCreate_edit(0)
  return (
    <>
      {/* <Button>新增</Button> */}

      <AlertRuleListJsx
        AlertRuleList={AlertRuleList}
        setAlertRuleList={setAlertRuleList}
        currentSelect={currentSelect}
        setCurrentSelect={setCurrentSelect}
      ></AlertRuleListJsx>
    </>
  );
}

function AlertRuleListJsx({
  AlertRuleList,
  setAlertRuleList,
  // create_edit,
  // setCreate_edit,
  currentSelect,
  setCurrentSelect,
}) {
  const [visible, setVisible] = useState(false);

  function handleDel(id) {
    DelAR(id, "", "")
      .then((data) => {
        let newList = AlertRuleList.filter((e) => e.id !== id);
        setAlertRuleList(newList);
        MyToast("success", "删除成功");
      })
      .catch((error) => {
        MyToast("删除失败");
      });
  }
  let ListMap = AlertRuleList.map((data, idx) => {
    return (
      <Cell
        key={data.id}
        label={<span style={{ color: "black" }}>{data.description}</span>}
        desc={data.type === 1 ? "单点" : "流式"}
        onClick={() => {
          setCurrentSelect(data.id);
          setVisible(!visible);
        }}
      >
        <DialogDemo
          content={"删除"}
          handleDel={() => {
            handleDel(data.id);
          }}
        ></DialogDemo>
      </Cell>
    );
  });
  return (
    <>
      {ListMap}
      <InfoPopup
        setCurrentSelect={setCurrentSelect}
        AlertRuleList={AlertRuleList}
        setAlertRuleList={setAlertRuleList}
        visible={visible}
        setVisible={setVisible}
        info={currentSelect}
        currentSelectId={currentSelect}
        // create_edit={create_edit}
      ></InfoPopup>
    </>
  );
}
function checkRequire(newDetail) {
  if (
    "entityId" in newDetail &&
    "description" in newDetail &&
    "type" in newDetail &&
    newDetail.entityId.length > 0 &&
    newDetail.description.length > 0
  ) {
    if (newDetail.type === 1) {
      if (
        "operator" in newDetail &&
        "threshold" in newDetail &&
        newDetail.operator.length > 0
      )
        return true;
      else return false;
    } else {
      if (
        "window" in newDetail &&
        "consecutive" in newDetail &&
        "metric" in newDetail &&
        "operator" in newDetail &&
        "threshold" in newDetail &&
        newDetail.operator.length > 0
      )
        return true;
      else return false;
    }
  } else {
    return false;
  }
}
function InfoPopup({
  visible,
  setVisible,
  setCurrentSelect,
  currentSelectId,
  // create_edit,
  AlertRuleList,
  setAlertRuleList,
}) {
  const [detail, setDetail] = useState({});
  const [newDetail, setNewDetail] = useState({});
  const [del, setDel] = useState(false);
  const window = useRef("");
  //* 点开弹窗之后根据当前所选的规则去显示信息
  useEffect(() => {
    if (visible === true)
      ShowDetailOfAR(currentSelectId)
        .then((data) => {
          setDetail(data);
          setNewDetail(data);
        })
        .catch((error) => {
          MyToast("获取告警规则详情失败");
        });
  }, [currentSelectId, visible]);

  let infos = <div>loading</div>;
  const values = [
    "",
    "全部值",
    "平均值",
    "最小值",
    "最大值",
    "所有值",
    "个数",
    "离群点",
  ];
  //* 初始化判断
  //*1是单点，2是流式
  const tabData = [
    { title: "单点", value: 1 },
    { title: "流式", value: 2 },
  ];
  if (Object.keys(newDetail).length === 0);
  else {
    infos = (
      <>
        <Cell className="popup-title">更新告警规则</Cell>
        <Input
          label="EntityId"
          defaultValue={newDetail.entityId}
          onChange={(e) =>
            setNewDetail({ ...newDetail, entityId: e.target.value })
          }
        />
        <Input
          label="描述"
          defaultValue={newDetail.description}
          onChange={(e) =>
            setNewDetail({ ...newDetail, description: e.target.value })
          }
        />

        <Cell label="类型">
          <Tabs
            disabled
            tabs={tabData}
            type={"card"}
            activeTab={newDetail.type - 1}
            onChange={(tab, index) => {
              setNewDetail({ ...detail, type: tab.value });
            }}
          ></Tabs>
        </Cell>

        <Cell>告警条件</Cell>
        {newDetail.type === 1 ? (
          <>
            {/* <Select
                label={"变量"}
                singleList={[
                  [
                    { label: newDetail.variable, value: newDetail.variable },
                    { label: newDetail.variable, value: newDetail.variable },
                  ],
                ]}
                text={newDetail.variable}
                handleChange={(e) => {
                  console.log(e);
                  setNewDetail({ ...newDetail, variable: e });
                }}
                disabled={true}
              ></Select> */}
            <Input
              label="变量"
              defaultValue={newDetail.variable}
              disabled
            ></Input>
            <Select
              label={"运算符"}
              singleList={[
                [
                  { label: ">", value: ">" },
                  { label: ">=", value: ">=" },
                  { label: "<", value: "<" },
                  { label: "<=", value: "<=" },
                  { label: "!=", value: "!=" },
                ],
              ]}
              text={newDetail.operator}
              handleChange={(e) => {
                // console.log(e);
                setNewDetail({ ...newDetail, operator: e });
              }}
            ></Select>
            <Input
              label="阈值"
              defaultValue={newDetail.threshold.toString()}
              onChange={(e) => {
                setNewDetail({ ...newDetail, threshold: e.target.value });
              }}
            ></Input>
          </>
        ) : (
          <>
            <Input
              label="周期"
              defaultValue={newDetail.window.toString()}
              onChange={(e) => {
                window.current = { ...window.current, w: e.target.value };
                if ("w" in window.current && "dw" in window.current) {
                  setNewDetail({
                    ...newDetail,
                    window: window.current.w + window.current.dw,
                  });
                }
              }}
            ></Input>
            <Select
              disabled
              label={"单位"}
              singleList={[
                [
                  { label: "秒/周期", value: "sec" },
                  { label: "分钟/周期", value: "min" },
                  { label: "小时/周期", value: "hour" },
                  { label: "天/周期", value: "day" },
                ],
              ]}
              text={newDetail.dw === undefined ? "请选择单位" : newDetail.dw}
              handleChange={(e) => {
                window.current = { ...window.current, dw: e };
                if ("w" in window.current && "dw" in window.current) {
                  setNewDetail({
                    ...newDetail,
                    window: window.current.w + window.current.dw,
                  });
                }
              }}
            ></Select>
            <Cell
              label="持续"
              text={
                <div className="input-span">
                  <Input
                    defaultValue={newDetail.consecutive.toString()}
                    onChange={(e) =>
                      setNewDetail({
                        ...newDetail,
                        consecutive: e.target.value,
                      })
                    }
                  />
                  <span style={{ width: "20%" }}>个周期</span>
                </div>
              }
            ></Cell>
            <Input
              label="变量"
              defaultValue={newDetail.variable}
              disabled
            ></Input>
            <Select
              label="计算方法"
              singleList={[
                [
                  { label: "全部值", value: 1 },
                  { label: "个数", value: 6 },
                  { label: "最大值", value: 4 },
                  { label: "最小值", value: 3 },
                  { label: "平均值", value: 2 },
                  { label: "求和", value: 5 },
                  { label: "离群点", value: 7 },
                ],
              ]}
              text={values[newDetail.metric]}
              handleChange={(e) => setNewDetail({ ...newDetail, metric: e })}
            ></Select>
          </>
        )}

        {/* <Select ></Select> */}
      </>
    );
  }
  function handleEdit() {
    if (checkRequire(newDetail))
      updateAR(detail.id, "", "", newDetail)
        .then((data) => {
          // console.log(newDetail);
          let temp = AlertRuleList.map((data) => {
            if (data.id === detail.id) return newDetail;
            return data;
          });
          setAlertRuleList([...temp]);
          setDetail(newDetail);
          MyToast("success", "修改成功");
          setVisible(!visible);
        })
        .catch((error) => {
          MyToast("error", "更新失败");
        });
    else {
      MyToast("warn", "必填项为空");
    }
  }
  function handleDel() {
    DelAR(detail.id, "", "")
      .then((data) => {
        let newList = AlertRuleList.filter((e) => e.id !== newDetail.id);
        setAlertRuleList(newList);
        MyToast("success", "删除成功");
      })
      .catch((error) => {
        MyToast("error", "删除失败");
      });
  }
  return (
    <>
      <PopupSwiper
        visible={visible}
        close={() => {
          setVisible(false);
          setCurrentSelect("");
        }}
        allowSwipeDirections={["right", "bottom"]}
        exitDirection={"bottom"}
      >
        {infos}
        {!del ? (
          <div className="popup-two-button">
            <Button
              onClick={() => {
                handleEdit();
              }}
            >
              {"确认修改"}
            </Button>
            <Button onClick={() => setDel(!del)} bgColor={delButtonbgColor}>
              {"删除"}
            </Button>
          </div>
        ) : (
          <div className="popup-two-button">
            <Button
              onClick={() => {
                setDel(!del);
              }}
            >
              {"取消删除"}
            </Button>
            <Button
              onClick={() => {
                handleDel();
              }}
            >
              {"确认删除"}
            </Button>
          </div>
        )}
      </PopupSwiper>
    </>
  );
}
