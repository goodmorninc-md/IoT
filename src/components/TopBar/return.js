
import { Button } from "@arco-design/mobile-react";
import { bgColor } from "@/styles/buttonColorConfig";
import {ReactComponent as IconGetBack} from "@/assets/icon/getBack.svg"
export default function ReturnButton({ navigate }) {
  return (
    <Button
      onClick={() => navigate()}
      className="Bu"
      bgColor={bgColor}
      icon={<IconGetBack className="iconInfoFpage"></IconGetBack>}
    >
      返回
    </Button>
  );
}
