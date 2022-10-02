import { ReactComponent as CloseIcon } from "../../assets/icon-cross.svg";
import Button from "../ui/button";

const Subtasks = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <input
          type="text"
          className="body-lg border border-medium-gray/25 rounded-[4px] py-2 px-4 focus:outline-0 focus:border-main-purple placeholder:text-black/25 w-full"
          placeholder="e.g. Make coffee"
        />
        <button type="button">
          <CloseIcon />
        </button>
      </div>
      <Button buttonType="secondary" type="button">
        + Add New Subtask
      </Button>
    </div>
  );
};

export default Subtasks;
