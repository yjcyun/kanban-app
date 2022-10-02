import { TaskType } from "../../types/data";
import Button from "../ui/button";
import Modal from "../ui/modal";
import ModalTitle from "../ui/modal-title";

type DeleteTaskProps = {
  data: TaskType;
};

const DeleteTask = ({ data }: DeleteTaskProps) => {
  return (
    <Modal>
      <div className="space-y-6">
        <ModalTitle title="Delete this task?" warning />
        <p className="body-lg">
          Are you sure you want to delete the ‘’ task and its subtasks? This
          action cannot be reversed.
        </p>
        <div className="flex gap-4">
          <Button buttonType="destructive">Delete</Button>
          <Button buttonType="secondary">Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTask;
