import { Radio } from "@arco-design/mobile-react";
export default function MyRadio({ setRecord, record }) {
  const dotIcon = {
    active: <IconCheckedDot />,
  };
  return (
    <Radio.Group
      layout="block"
      defaultValue={record.type}
      onChange={(value) => {
        // console.log(value);
        setRecord({ ...record, type: value });
      }}
    >
      <Radio value={1} layout="inline" icons={dotIcon}>
        普通
      </Radio>
      <Radio value={2} layout="inline" style={{ marginTop: 20 }}>
        流水线
      </Radio>
    </Radio.Group>
  );
}

function IconCheckedDot() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M18.5 10C18.5 14.6944 14.6944 18.5 10 18.5C5.30558 18.5 1.5 14.6944 1.5 10C1.5 5.30558 5.30558 1.5 10 1.5C14.6944 1.5 18.5 5.30558 18.5 10Z"
        stroke="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"
        fill="currentColor"
      />
    </svg>
  );
}
