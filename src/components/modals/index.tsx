import { useAppSelector } from "../../hooks/useStore";
import ViewTask from "./view-task";

const Modals = () => {
  const { type, data } = useAppSelector((state) => state.modal);
  return <>{type === "view-task" && <ViewTask data={data!} />}</>;
};

export default Modals;
