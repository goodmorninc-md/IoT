import { API_URL } from "@/services/Data";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import { Button, Cell, Collapse, Tabs, Image } from "@arco-design/mobile-react";
import { PopupSwiper, Popup } from "@arco-design/mobile-react";
import MyToast from "@/components/Toast/toast";
import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";
import * as Diagram from "@/services/diagram";
import CellNodata from "@/components/InfoList/lackData";
export default function Status({}) {
  const [visible, setVisible] = useState(false);
  const [diagramUsageList, setDiagramUsageList] = useState([]);
  const [currentDiagram, setCurrentDiagram] = useState({});
  const { currentProduct } = useContext(ProductContext);
  return (
    <>
      {Object.keys(currentProduct).length === 0 ? (
        <CellNodata></CellNodata>
      ) : (
        <>
          <Button onClick={() => setVisible(true)} className="tab-under-button">
            选择
          </Button>

          <PopupSwiper
            visible={visible}
            close={() => {
              setVisible(false);
            }}
            direction={"right"}
          >
            <div style={{ width: "8rem" }}>
              <Tabs
                type="card"
                tabs={[
                  { title: "产品" },
                  // { title: "客户" }, { title: "标签" }
                ]}
                onChange={(tab, index) => {
                  let type;
                  if (index === 0) type = 1;
                  else if (index === 1) type = 3;
                  else type = 4;

                  Diagram.FindDiagramUsage(currentProduct.id, type)
                    .then((data) => {
                      setDiagramUsageList(data);
                    })
                    .catch((error) => {
                      MyToast("error", "创建客户失败");
                    });
                }}
              >
                <DiaGramList
                  diagramUsageList={diagramUsageList}
                  setDiagramUsageList={setDiagramUsageList}
                  currentDiagram={currentDiagram}
                  setCurrentDiagram={setCurrentDiagram}
                  visible={visible}
                  setVisible={setVisible}
                ></DiaGramList>
              </Tabs>
            </div>
          </PopupSwiper>
          {Object.keys(currentDiagram).length > 0 ? (
            <Data currentDiagram={currentDiagram}></Data>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

function DiaGramList({
  diagramUsageList,
  setDiagramUsageList,
  currentDiagram,
  setCurrentDiagram,
  visible,
  setVisible,
}) {
  const { currentProduct } = useContext(ProductContext);
  const [openIndex, setOpenIndex] = useState(-1);
  const imagesRef = useRef([]);
  useEffect(() => {
    Diagram.FindDiagramUsage(currentProduct.id)
      .then((data) => {
        setDiagramUsageList(data);
      })
      .catch((error) => {
        MyToast("error", "获取列表失败");
      });
  }, []);
  const thumbs = [
    "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg",
    "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg",
    "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg",
  ];

  //
  return (
    <Cell.Group>
      <Cell>缩略图</Cell>
      {diagramUsageList.map((data) => {
        const url = `http://qliot.oss-cn-hangzhou.aliyuncs.com/${currentProduct.id}/${data.file.fd}`;
        return (
          <Cell
            label={
              <Image
                alt="Example"
                style={{ width: "1.5rem", height: "1rem" }}
                src={url}
              />
            }
            showArrow
            onClick={() => {
              setCurrentDiagram(data);
              setVisible(!visible);
            }}
          ></Cell>
        );
      })}
      {/* <Cell label={<Image src={}></Image>}></Cell> */}
    </Cell.Group>
  );
}
function getRandomNumber() {
  const randomNumber = Math.random() * (100 - 10) + 10;
  return randomNumber.toFixed(2);
}
function Data({ currentDiagram }) {
  const { currentProduct } = useContext(ProductContext);
  let specification = currentProduct.specification;
  return (
    <div className="container">
      {currentDiagram.groups.map((data, idx) => {
        return (
          <Collapse
            style={{ width: "100%", borderBottom: "0.1rem solid #dcdcdc" }}
            header={data.name}
            // value="2"
            content={
              <div className="container">
                <div className="varia-list">
                  {/* <div className="varia-head"></div> */}
                  {data.variables.map((varia, idx) => {
                    return (
                      <Cell
                        label={
                          specification.find((e) => e.variable === varia).name
                        }
                        desc={varia}
                      >
                        {getRandomNumber()}
                      </Cell>
                    );
                  })}
                </div>
              </div>
            }
          />
        );
      })}
    </div>
  );
}
