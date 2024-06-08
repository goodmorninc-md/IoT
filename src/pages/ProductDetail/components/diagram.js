import * as Diagram from "@/services/diagram";
import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Cell, Image, ImagePreview } from "@arco-design/mobile-react";
import MyToast from "@/components/Toast/toast";
import { API_URL } from "@/services/Data";
export default function DiagramComp({ activeIndex }) {
  const { productId } = useParams();
  const [diagramList, setDiagramList] = useState([]);
  const [openIndex, setOpenIndex] = useState(-1);
  const imagesRef = useRef([]);

  useEffect(() => {
    if (activeIndex === 4) {
      Diagram.GetDiagramList(productId).then((res) => {
        setDiagramList(res);
        console.log(res);
      }).catch(error=>{
        MyToast("error","获取设备列表失败")
      });
    }
  }, [activeIndex]);
  const ImagePreviewComp = [];
  const child = diagramList.map((data, idx) => {
    const url = `
  http://qliot.oss-cn-hangzhou.aliyuncs.com/${productId}/${data.file.fd}`;
    ImagePreviewComp.push({ src: url, fallbackSrc: url });
    return (
      <Cell
        label={
          <Image
            alt="Example"
            style={{ width: "1.5rem", height: "1rem" }}
            src={url}
          />
        }
        bordered={false}
        text={data.description}
        onClick={() => setOpenIndex(idx)}
      ></Cell>
    );
  });
  return (
    <>
      <div className="diagram-div ">
        <span>缩略图</span>
        <span>描述</span>
      </div>
      {child}
      <ImagePreview
        openIndex={openIndex}
        close={() => setOpenIndex(-1)}
        onImageDoubleClick={(index) => console.log("dbl click", index)}
        onImageLongTap={(index, image) => {
          alert("long tap");
          console.log("long tap", index, image);
        }}
        // spaceBetween={30}
        thumbPosition="center top"
        getThumbBounds={(index) =>
          imagesRef.current[index]?.dom?.getBoundingClientRect()
        }
        images={ImagePreviewComp}
      />
    </>
  );
}
