import { useAppSelector } from "@hooks/useStore";
import AddTask from "./add-task";
import DeleteTask from "./delete-task";
import ViewTask from "./view-task";

const Modals = () => {
  const { type, data } = useAppSelector((state) => state.modal);
  const boardTab = useAppSelector((state) => state.boardTab);

  return (
    <>
      {type === "view-task" && (
        <ViewTask data={data!} currentBoard={boardTab} />
      )}
      {type === "add-task" && <AddTask currentBoard={boardTab} />}
      {type === "delete-task" && <DeleteTask data={data!} />}
    </>
  );
};

export default Modals;
