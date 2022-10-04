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
  const OPTIONS = [
    { id: 0, label: `Edit ${text}`, onClick: onEdit, className: "" },
    {
      id: 1,
      label: `Delete ${text}`,
      onClick: onDelete,
      className: "text-red",
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(OPTIONS[0].id);
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setOpenDropdown(false));

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="py-2 px-2 -mr-3 rounded-2xl"
        onClick={() => setOpenDropdown(!openDropdown)}
        aria-expanded={openDropdown}
        aria-haspopup="listbox"
        tabIndex={0}
        aria-label="more options"
        title="More Options "
      >
        <VerticalIcon />
      </button>
      <ul
        className={`absolute w-[192px] shadow-dropbox rounded-lg p-4 bg-tertiary-color body-lg text-left space-y-4 z-20 
        ${openDropdown ? "block" : "hidden"} 
        ${
          direction === "right"
            ? "mt-5 right-2 top-8"
            : "mt-6 left-0 -translate-x-1/2 "
        }`}
        tabIndex={-1}
        role="listbox"
        aria-activedescendant={OPTIONS[activeMenuItem].label}
      >
        {OPTIONS.map((item) => (
          <li
            key={item.id}
            onMouseEnter={() => setActiveMenuItem(item.id)}
            onClick={() => {
              setOpenDropdown(false);
              item.onClick();
            }}
            className={`${item.className} hover:underline cursor-pointer`}
            role="option"
            aria-selected={activeMenuItem === item.id}
            tabIndex={0}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
