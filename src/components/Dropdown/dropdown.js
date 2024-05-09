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
  className,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  let initialValue_name = initialValue;

  let DropDownList = DropDownElements.map((e,idx) => {
    if (e.id === initialValue) {
      initialValue_name = e.name;
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
        {initialValue_name}
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
