import { useState, useRef } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { ReactComponent as CaretDownIcon } from "../../assets/icon-chevron-down.svg";

type SelectProps = {
  options: string[];
  currentOption: string;
};

const Select = ({ options, currentOption }: SelectProps) => {
  const [isDropped, setIsDropped] = useState(false);
  const [selectedOption, setSelectedOption] = useState(currentOption);

  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsDropped(false));

  const onSelectChange = (term: string) => {
    setSelectedOption(term);
    setIsDropped(false);
  };

  return (
    <div className="relative" ref={ref}>
      {/* Selected Field */}
      <div
        className={`flex items-center justify-between cursor-pointer border border-medium-gray/25 py-2 px-4 body-lg rounded text-black hover:border-violet ${
          isDropped && "border-main-purple"
        }`}
        onClick={() => setIsDropped(!isDropped)}
      >
        <span>{selectedOption}</span>
        <CaretDownIcon />
      </div>

      {/* Select Dropbox */}
      <div
        className={`absolute mt-3 shadow-dropbox w-full rounded-lg bg-white dark:bg-dark-navy text-navy dark:text-white z-10 p-4 ${
          isDropped ? "block" : "hidden"
        }`}
      >
        <ul className="space-y-2">
          {options.map((option) => (
            <li
              key={option}
              className="cursor-pointer hover:text-main-purple body-lg"
              onClick={() => onSelectChange(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
