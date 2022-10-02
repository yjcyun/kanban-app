import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as BoardIcon } from "@assets/icon-board.svg";

type SidebarItemProps = {
  label: string;
  to?: string;
  highlight?: boolean;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  type: "link" | "button";
  onClick?: () => void;
};

interface ItemProps
  extends Pick<SidebarItemProps, "label" | "highlight" | "Icon"> {
  isActiveLink?: boolean;
}

const Item = ({
  highlight = false,
  Icon,
  isActiveLink = false,
  label,
}: ItemProps) => {
  const IconComponent = Icon!;

  return (
    <div
      className={[
        "heading-md flex items-center gap-3 whitespace-nowrap py-[14px] pl-6  rounded-r-full group-hover:text-main-purple ",
        isActiveLink
          ? "bg-main-purple text-white group-hover:text-white"
          : "group-hover:bg-main-purple/10",
        highlight ? "text-main-purple" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <IconComponent
        className={[
          highlight && !isActiveLink ? "fill-main-purple" : "",
          (isActiveLink && highlight) || isActiveLink ? "fill-white " : "",
          isActiveLink ? "" : "group-hover:fill-main-purple",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {label}
    </div>
  );
};

const SidebarItem = ({
  label,
  to,
  highlight = false,
  Icon,
  type,
  onClick,
}: SidebarItemProps) => {
  const location = useLocation();
  const isActiveLink = location.pathname === to;

  return (
    <li className="group mr-6">
      {type === "link" ? (
        <NavLink to={to!}>
          <Item
            isActiveLink={isActiveLink}
            label={label}
            highlight={highlight}
            Icon={BoardIcon}
          />
        </NavLink>
      ) : (
        <button className="w-full" onClick={onClick}>
          <Item label={label} highlight={highlight} Icon={Icon} />
        </button>
      )}
    </li>
  );
};

export default SidebarItem;
