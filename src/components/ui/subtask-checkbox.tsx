import { ChangeEvent } from "react";
import { ReactComponent as CheckIcon } from "../../assets/icon-check.svg";

type SubtaskCheckboxProps = {
  label: string;
  isChecked: boolean;
  onChange: (index: number) => void;
  id: number;
};

const SubtaskCheckbox = ({
  id,
  label,
  isChecked,
  onChange,
}: SubtaskCheckboxProps) => {
  return (
    <label className="flex items-center cursor-pointer grou p-3 bg-light-gray hover:bg-main-purple/25 rounded-[4px] mb-2 last:mb-0">
      <input
        type="checkbox"
        className="appearance-none"
        checked={isChecked}
        onChange={() => onChange(id)}
        name={label}
      />
      <div
        className={`w-4 h-4 rounded-sm mr-4 border border-medium-gray/25 relative ${
          isChecked ? "bg-main-purple border-main-purple" : "bg-white"
        }`}
      >
        <CheckIcon
          className={`${
            isChecked ? "block" : "hidden"
          } absolute top-[3.5px] left-[2.5px]`}
        />
      </div>
      <span className={`body-md ${isChecked ? "line-through" : "text-black"}`}>
        {label}
      </span>
    </label>
  );
};

export default SubtaskCheckbox;
