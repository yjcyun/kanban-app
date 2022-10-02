import { useAppSelector } from "@hooks/useStore";
import AddTask from "./add-task";
import DeleteTask from "./delete-task";
import ViewTask from "./view-task";

const Modals = () => {
  const { type, data } = useAppSelector((state) => state.modal);

  return (
    <>
      {type === "view-task" && <ViewTask data={data!} />}
      {type === "add-task" && <AddTask />}
      {type === "delete-task" && <DeleteTask data={data!} />}
    </>
  );
};

export default Modals;
