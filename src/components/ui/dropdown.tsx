import { useState, useRef } from "react";
import { ReactComponent as VerticalIcon } from "@assets/icon-vertical-ellipsis.svg";
import { useOnClickOutside } from "@hooks/useOnClickOutside";

type DropdownProps = {
  onEdit: () => void;
  onDelete: () => void;
  text: string;
  direction: "right" | "center";
};

const Dropdown = ({ onEdit, onDelete, text, direction }: DropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setOpenDropdown(false));

  return (
    <button
      className="relative group px-3 -mr-3"
      onClick={() => setOpenDropdown(!openDropdown)}
      ref={dropdownRef}
    >
      <VerticalIcon className="group-hover:fill-main-purple" />
      <div
        className={`absolute w-[192px] shadow-dropbox rounded-lg p-4 bg-tertiary-color body-lg text-left space-y-4 z-20 
        ${openDropdown ? "block" : "hidden"} 
        ${
          direction === "right"
            ? "mt-5 right-2 top-8"
            : "mt-6 left-0 -translate-x-1/2 "
        }`}
      >
        <p onClick={onEdit} className="hover:underline">
          Edit {text}
        </p>
        <p className="text-red hover:underline" onClick={onDelete}>
          Delete {text}
        </p>
      </div>
    </button>
  );
};

export default Dropdown;
