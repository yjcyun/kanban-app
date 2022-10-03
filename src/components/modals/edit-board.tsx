import { FormProvider, useForm } from "react-hook-form";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";
import BoardForm from "@components/form/board-form";
import { BoardType, ModalType } from "@type/data";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { updateBoard } from "@store/task-slice";

const EditBoard = ({ currentBoard }: ModalType) => {
  const dispatch = useAppDispatch();
  const boardData = useAppSelector((state) => state.tasks);
  const boardTab = useAppSelector((state) => state.boardTab);
  const currentBoardData = boardData.boards.find(
    (board) => board.name === boardTab
  );

  const methods = useForm<BoardType>({
    defaultValues: {
      id: currentBoardData?.id,
      name: currentBoardData?.name,
      columns: currentBoardData?.columns.map((col) => ({
        id: col.id,
        name: col.name,
        tasks: col.tasks,
      })),
    },
  });

  const onSubmit = (data: BoardType) => {
    dispatch(updateBoard({ currentBoard, updatedBoard: data }));
  };

  return (
    <Modal>
      <ModalTitle title="Edit Board" />
      <FormProvider {...methods}>
        <BoardForm mode="edit" onSubmitHandler={onSubmit} />
      </FormProvider>
    </Modal>
  );
};

export default EditBoard;
