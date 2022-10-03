import { ReactComponent as BoardIcon } from "@assets/icon-board.svg";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { selectTab } from "@store/board-slice";
import { openModal } from "@store/modal-slice";
import { setBoardColumns } from "@store/task-slice";

type SidebarItemProps = {
  defaultTab?: boolean;
  handleBoardItemClick?: () => void;
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
}: ItemProps) => {
  const IconComponent = Icon!;

  return (
    <div
      className={`heading-md flex items-center gap-3 whitespace-nowrap py-[14px] pl-6  rounded-r-full group hover:text-main-purple ${
        isSelected
          ? "bg-main-purple text-white group-hover:text-white"
          : "group-hover:bg-main-purple/10 dark:group-hover:bg-white"
      }
       ${highlight ? "text-main-purple" : ""}`}
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
  handleBoardItemClick,
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
    if (highlight) {
      dispatch(openModal({ type: "add-board" }));
    } else {
      dispatch(selectTab(label));
      dispatch(setBoardColumns(label));
    }

    handleBoardItemClick && handleBoardItemClick();
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
