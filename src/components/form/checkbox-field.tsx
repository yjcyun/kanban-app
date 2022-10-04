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
    <>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => onChange(id)}
        name={label}
        id={label}
      />

      <label
        className={`body-md p-3 bg-color rounded-[4px] mb-2 last:mb-0 hover:bg-main-purple/25  heading-color ${
          isChecked
            ? "before:bg-main-purple line-through text-black/50 dark:text-white/50"
            : "before:bg-secondary-color before:border before:border-medium-gray/25"
        }`}
      >
        {label}
      </label>
    </>
  );
};

export default CheckboxField;
