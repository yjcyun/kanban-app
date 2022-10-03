import { ReactComponent as CheckIcon } from "@assets/icon-check.svg";

type CheckboxFieldProps = {
  label: string;
  isChecked: boolean;
  onChange: (index: number) => void;
  id: number;
};

const CheckboxField = ({
  id,
  label,
  isChecked,
  onChange,
}: CheckboxFieldProps) => {
  return (
    <label className="flex items-center cursor-pointer p-3 bg-color hover:bg-main-purple/25 rounded-[4px] mb-2 last:mb-0">
      <input
        type="checkbox"
        className="appearance-none"
        checked={isChecked}
        onChange={() => onChange(id)}
        name={label}
      />
      <div
        className={`w-4 h-4 rounded-sm mr-4 border border-medium-gray/25 relative flex-shrink-0 ${
          isChecked ? "bg-main-purple border-main-purple" : "bg-white"
        }`}
      >
        <CheckIcon
          className={`${
            isChecked ? "block" : "hidden"
          } absolute top-[3.5px] left-[2.5px]`}
        />
      </div>
      <span
        className={`body-md heading-color ${
          isChecked ? "line-through text-black/50 dark:text-white/50" : ""
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default CheckboxField;
