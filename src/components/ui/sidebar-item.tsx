import { ReactComponent as BoardIcon } from "@assets/icon-board.svg";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { selectTab } from "@store/board-slice";

type SidebarItemProps = {
  defaultTab?: boolean;
  highlight?: boolean;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  onHideSidebar?: () => void;
  type: "board" | "button";
};

interface ItemProps
  extends Pick<
    SidebarItemProps,
    "label" | "highlight" | "Icon" | "defaultTab"
  > {
  isSelected?: boolean;
}

const Item = ({
  highlight = false,
  Icon,
  isSelected = false,
  label,
  defaultTab,
}: ItemProps) => {
  const IconComponent = Icon!;

  return (
    <div
      className={[
        "heading-md flex items-center gap-3 whitespace-nowrap py-[14px] pl-6  rounded-r-full group-hover:text-main-purple ",
        isSelected
          ? "bg-main-purple text-white group-hover:text-white"
          : "group-hover:bg-main-purple/10",
        highlight ? "text-main-purple" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <IconComponent
        className={[
          highlight && !isSelected ? "fill-main-purple" : "",
          (isSelected && highlight) || isSelected ? "fill-white " : "",
          isSelected ? "" : "group-hover:fill-main-purple",
        ]
          .filter(Boolean)
          .join(" ")}
      />
      {label}
    </div>
  );
};

const SidebarItem = ({
  defaultTab,
  highlight = false,
  Icon,
  label,
  onHideSidebar,
  type,
}: SidebarItemProps) => {
  const boardTab = useAppSelector((state) => state.boardTab);
  const dispatch = useAppDispatch();
  const activeTab = boardTab ? boardTab === label : defaultTab;

  const onSelectTab = () => {
    dispatch(selectTab(label));
  };

  return (
    <li className="group mr-6">
      {type === "board" ? (
        <button className="w-full" onClick={onSelectTab}>
          <Item
            label={label}
            highlight={highlight}
            Icon={BoardIcon}
            isSelected={activeTab}
            defaultTab={defaultTab}
          />
        </button>
      ) : (
        <button className="w-full" onClick={onHideSidebar}>
          <Item label={label} highlight={highlight} Icon={Icon} />
        </button>
      )}
    </li>
  );
};

export default SidebarItem;
