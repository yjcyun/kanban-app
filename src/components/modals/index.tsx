import { useAppSelector } from "@hooks/useStore";
import AddBoard from "./add-board";
import AddTask from "./add-task";
import DeleteBoard from "./delete-board";
import DeleteTask from "./delete-task";
import EditBoard from "./edit-board";
import EditTask from "./edit-task";
import ViewTask from "./view-task";

const Modals = () => {
  const modalState = useAppSelector((state) => state.modal);
  const boardTab = useAppSelector((state) => state.boardTab);

  return (
    <>
      {modalState.type === "view-task" && (
        <ViewTask {...modalState} currentBoard={boardTab} />
      )}
      {modalState.type === "add-task" && <AddTask currentBoard={boardTab} />}
      {modalState.type === "delete-task" && (
        <DeleteTask {...modalState} currentBoard={boardTab} />
      )}
      {modalState.type === "edit-task" && (
        <EditTask {...modalState} currentBoard={boardTab} />
      )}
      {modalState.type === "add-board" && (
        <AddBoard {...modalState} currentBoard={boardTab} />
      )}
      {modalState.type === "edit-board" && (
        <EditBoard {...modalState} currentBoard={boardTab} />
      )}
      {modalState.type === "delete-board" && (
        <DeleteBoard {...modalState} currentBoard={boardTab} />
      )}
    </>
  );
};

export default Modals;
