import { API_URL } from "@/services/Data";
import { useState, useContext, useRef, useEffect } from "react";
import { Fragment } from "react";
import { OrganizationContext } from "@/context/Organization";
import { AuthContext } from "@/context/AuthContext";
import {
  Button,
  Cell,
  Input,
  Radio,
  Tabs,
  Image,
  ImagePreview,
} from "@arco-design/mobile-react";
import { CreateOrganization } from "@/services/Organization";
import { GetProductListByOrg } from "@/services/Product";
import { PopupSwiper, Popup } from "@arco-design/mobile-react";

import { ProductContext } from "@/context/Product";
import { useNavigate } from "react-router-dom";
import * as Diagram from "@/services/diagram";
export default function Status({}) {
  const [visible, setVisible] = useState(false);
  const [diagramUsageList, setDiagramUsageList] = useState([]);
  const [currentDiagram, setCurrentDiagram] = useState({});
  const { currentProduct } = useContext(ProductContext);
  return (
    <>
      {Object.keys(currentProduct).length === 0 ? (
        <></>
      ) : (
        <>
          <Button onClick={() => setVisible(true)} className="tab-under-button">
            选择
          </Button>

          <PopupSwiper
            visible={visible}
            close={() => {
              setVisible(false);
              console.log("清空");
            }}
            direction={"right"}
          >
            <div style={{ width: "8rem" }}>
              <Tabs
                type="card"
                tabs={[{ title: "产品" }, { title: "客户" }, { title: "标签" }]}
                onChange={(tab, index) => {
                  let type;
                  if (index === 0) type = 1;
                  else if (index === 1) type = 3;
                  else type = 4;

                  Diagram.FindDiagramUsage(currentProduct.id, type).then(
                    (data) => {
                      setDiagramUsageList(data);
                    }
                  );
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
    Diagram.FindDiagramUsage(currentProduct.id).then((data) => {
      console.log(data);
      setDiagramUsageList(data);
    });
  }, []);
  const thumbs = [
    "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_5.jpg",
    "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_1.jpg",
    "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/large_image_2.jpg",
  ];
  const url = `https://api.qiaolian.co/api/v1.dev/product/"${currentProduct.id}"/`;

  //
  return (
    <Cell.Group>
      <Cell>缩略图</Cell>
      {diagramUsageList.map((data) => {
        console.log(url + data.file.fd);
        return (
          <Cell
            label={<Image src={url + data.file.fd}></Image>}
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

function Data({ currentDiagram }) {
  const { currentProduct } = useContext(ProductContext);
  console.log("currentProduct", currentProduct);
  let specification = currentProduct.specification;
  return (
    <div className="container">
      {currentDiagram.groups.map((data, idx) => {
        return (
          <div className="varia-list">
            <div className="varia-head">{data.name}</div>
            {data.variables.map((varia, idx) => {
              console.log(specification.find((e) => e.variable === varia));
              return (
                <Cell
                  label={specification.find((e) => e.variable === varia).name}
                  text={varia}
                ></Cell>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
