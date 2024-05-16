import { Dropdown, Button } from "@arco-design/mobile-react";
import { useState } from "react";
import { useContext } from "react";
import {
  OrganizationContextProvider,
  OrganizationContext,
} from "@/context/Organization";
import { useNavigate } from "react";
import { IconArrowDown, IconArrowUp } from "@arco-design/mobile-react/esm/icon";
export default function MyDropDown({
  DropDownElements,
  DropDownOnClick,
  initialValue,
  initialValueName,
  className,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  console.log(DropDownElements);
  let DropDownList = DropDownElements.map((e, idx) => {
    
    if (e.id === initialValue) {
      initialValueName = e.name;
    }
    return {
      label: e.name,
      value: e.id,
    };
  });
  return (
    <div className={className}>
      <Button
        size="huge"
        className="select-wrapper"
        onClick={() => setShowDropdown(!showDropdown)}
        inline
      >
        {initialValueName}
        {showDropdown === false ? (
          <IconArrowDown></IconArrowDown>
        ) : (
          <IconArrowUp></IconArrowUp>
        )}
      </Button>
      <Dropdown
        options={DropDownList}
        showDropdown={showDropdown}
        onOptionClick={DropDownOnClick}
        onOptionChange={(value, item) => {
          setShowDropdown(false);
        }}
        onCancel={() => setShowDropdown(false)}
      />
    </div>
  );
}
