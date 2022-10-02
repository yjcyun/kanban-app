import { useAppDispatch } from "@hooks/useStore";
import { closeModal } from "@store/modal-slice";
import { deleteBoard } from "@store/task-slice";
import { ModalType } from "@type/data";
import Button from "@ui/button";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";

const DeleteBoard = ({ currentBoard }: ModalType) => {
  const dispatch = useAppDispatch();

  const onBoardDelete = () => {
    dispatch(deleteBoard(currentBoard));
    dispatch(closeModal());
  };

  const onBoardCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal>
      <div className="space-y-6">
        <ModalTitle title="Delete this board?" warning />
        <p className="body-lg">
          Are you sure you want to delete the ‘{currentBoard}’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="flex gap-4">
          <Button buttonType="destructive" onClick={onBoardDelete}>
            Delete
          </Button>
          <Button buttonType="secondary" onClick={onBoardCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBoard;
