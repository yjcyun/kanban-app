import { useAppSelector } from "@hooks/useStore";
import AddTask from "./add-task";
import DeleteTask from "./delete-task";
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
    </>
  );
};

export default Modals;
