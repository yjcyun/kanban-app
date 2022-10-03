import { FormProvider, useForm } from "react-hook-form";
import Modal from "@ui/modal";
import ModalTitle from "@ui/modal-title";
import BoardForm from "@components/form/board-form";
import { BoardType, ModalType } from "@type/data";
import { useAppDispatch } from "@hooks/useStore";
import { addBoard } from "@store/task-slice";
import { nanoid } from "@reduxjs/toolkit";

const AddBoard = (props: ModalType) => {
  const { currentBoard } = props;
  const dispatch = useAppDispatch();
  const methods = useForm<BoardType>({
    defaultValues: {
      id: nanoid(),
      name: "",
      columns: [
        { id: nanoid(), name: "Todo", tasks: [] },
        { id: nanoid(), name: "Doing", tasks: [] },
      ],
    },
  });

  const onSubmit = (data: BoardType) => {
    dispatch(addBoard({ currentBoard, newBoard: data }));
  };

  return (
    <Modal>
      <ModalTitle title="Add New Board" />
      <FormProvider {...methods}>
        <BoardForm mode="add" onSubmitHandler={onSubmit} />
      </FormProvider>
    </Modal>
  );
};

export default AddBoard;
