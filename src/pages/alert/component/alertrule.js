import MyTabBar from "@/components/TabBar/TabBar";
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
  Radio,
  Popup,
} from "@arco-design/mobile-react";
import MyToast from "@/components/Toast/toast";
import MyDropDown from "@/components/Dropdown/dropdown";
import { useNavigate } from "react-router-dom";
import Select from "@/components/select/select";
//* 获取变量列表
import { ShowDetailDiagram } from "@/services/diagram";
import {
  GetAlertRules,
  CreateAL,
  ShowDetailOfAR,
  updateAR,
  UpdateStatus,
  DelAR,
} from "@/services/alertrule";
import { delButtonbgColor } from "@/styles/buttonColorConfig";
export default function AlertRule({}) {
  const { current_Organization } = useContext(OrganizationContext);
  const { currentProduct } = useContext(ProductContext);
  // const [create_edit, setCreate_edit] = useState(0);
  const [AlertRuleList, setAlertRuleList] = useState([]);

  const [currentSelect, setCurrentSelect] = useState("");
  useEffect(() => {
    GetAlertRules(currentProduct.id).then((data) => {
      setAlertRuleList(data);
    });
  }, [currentProduct, currentSelect]);
  return (
    <>
      {/* <Button onClick={() => setCreate_edit(0)}>新增</Button> */}
      <table className="table">
        <thead className="TrTable">
          <tr>
            <th>描述</th>
            <th>类型</th>
          </tr>
        </thead>
        <tbody>
          <AlertRuleListJsx
            AlertRuleList={AlertRuleList}
            setAlertRuleList={setAlertRuleList}
            // setCreate_edit={setCreate_edit}
            // create_edit={create_edit}
            currentSelect={currentSelect}
            setCurrentSelect={setCurrentSelect}
          ></AlertRuleListJsx>
        </tbody>
      </table>
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
    DelAR(id, "", "").then((data) => {
      let newList = AlertRuleList.filter((e) => e.id !== id);
      setAlertRuleList(newList);
      MyToast("success", "删除成功");
    });
  }
  let ListMap = AlertRuleList.map((data, idx) => {
    return (
      <Fragment key={data.id}>
        <tr>
          <td>
            {data.description}
            <Button
              onClick={() => {
                console.log(data.id);
                setCurrentSelect(data.id);
                setVisible(!visible);
                // setCreate_edit(1);
              }}
            >
              编辑
            </Button>
          </td>
          <td>
            {data.type === 1 ? "单点" : "流式"}
            <Button
              onClick={() => {
                handleDel(data.id);
              }}
              bgColor={delButtonbgColor}
            >
              删除
            </Button>
          </td>
        </tr>
      </Fragment>
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

  //* 点开弹窗之后根据当前所选的规则去显示信息
  useEffect(() => {
    console.log(currentSelectId);
    ShowDetailOfAR(currentSelectId).then((data) => {
      setDetail(data);
      setNewDetail(data);
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
  if (Object.keys(newDetail).length === 0);
  else {
    infos = (
      <>
        <Input
          label="EntityId"
          defaultValue={detail.entityId}
          onChange={(e) =>
            setNewDetail({ ...newDetail, entityId: e.target.value })
          }
        />
        <Input
          label="描述"
          defaultValue={detail.description}
          onChange={(e) =>
            setNewDetail({ ...newDetail, description: e.target.value })
          }
        />
        {
          //* 编辑不可修改类型
          /* <Select
          label={"类型"}
          singleList={[
            [
              { label: "单点", value: 1 },
              { label: "流式", value: 2 },
            ],
          ]}
          text={newDetail.type === 1 ? "单点" : "流式"}
          handleChange={(e) => {
            console.log(e);
            setNewDetail({ ...newDetail, type: e });
          }}
          // disabled={true}
        ></Select> */
        }
        <Cell label="类型" text={newDetail.type === 1 ? "单点" : "流式"}></Cell>
        <Cell.Group label={"告警条件"}>
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
              <Cell label="变量" text={newDetail.variable}></Cell>
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
                text={detail.operator}
                handleChange={(e) => {
                  console.log(e);
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
                onChange={(e) =>
                  setNewDetail({
                    ...newDetail,
                    window: parseInt(e.target.value),
                  })
                }
              ></Input>
              <Select
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
                  console.log(e);
                  setNewDetail({ ...newDetail, dw: e });
                }}
              ></Select>
              <Cell
                label="持续"
                text={
                  <>
                    <Input
                      defaultValue={newDetail.consecutive}
                      onChange={(e) =>
                        setNewDetail({
                          ...newDetail,
                          consecutive: e.target.value,
                        })
                      }
                    />
                    <span>个周期</span>
                  </>
                }
              ></Cell>
              <Cell label="变量" text={newDetail.variable}></Cell>
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
        </Cell.Group>
        {/* <Select ></Select> */}
      </>
    );
  }
  function handleEdit() {
    updateAR(detail.id, "", "", newDetail).then((data) => {
      console.log(newDetail);
      setDetail(newDetail);
      MyToast("success", "修改成功");
      setVisible(!visible);
    });
  }
  function handleDel() {
    DelAR(detail.id, "", "").then((data) => {
      let newList = AlertRuleList.filter((e) => e.id !== newDetail.id);
      setAlertRuleList(newList);
      MyToast("success", "删除成功");
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
          <>
            <Button
              onClick={() => {
                handleEdit();
              }}
            >
              {"确认修改"}
            </Button>
            <Button onClick={() => setDel(!del)}>{"删除"}</Button>
          </>
        ) : (
          <>
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
          </>
        )}
        <div></div>
      </PopupSwiper>
    </>
  );
}
