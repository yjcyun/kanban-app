import { useAppDispatch } from "@hooks/useStore";
import { closeModal } from "@store/modal-slice";
import { deleteTask } from "@store/task-slice";
import { ModalType } from "@type/data";
import Button from "@ui/button";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";

const DeleteTask = ({ data, currentBoard }: ModalType) => {
  const dispatch = useAppDispatch();

  const onTaskDelete = () => {
    dispatch(deleteTask({ currentBoard, currentTask: data! }));
    dispatch(closeModal());
  };

  const onTaskCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal>
      <div className="space-y-6">
        <ModalTitle title="Delete this task?" warning />
        <p className="body-lg">
          Are you sure you want to delete the ‘{data?.title}’ task and its
          subtasks? This action cannot be reversed.
        </p>
        <div className="flex gap-4">
          <Button buttonType="destructive" onClick={onTaskDelete}>
            Delete
          </Button>
          <Button buttonType="secondary" onClick={onTaskCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTask;
