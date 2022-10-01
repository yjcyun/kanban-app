import BoardColumn from "../components/ui/board-column";
import { useAppSelector } from "../hooks/useStore";

const BoardPage = () => {
  const { boards } = useAppSelector((state) => state.tasks);

  if (boards.length === 0) {
    return <div>Loading</div>;
  }

  const platformLaunch = boards.filter(
    (board) => board.name === "Platform Launch"
  )[0].columns;

  return (
    <>
      {platformLaunch.map((column) => (
        <BoardColumn
          tasks={column.tasks}
          label={column.name}
          length={column.tasks.length}
          key={column.name}
        />
      ))}
      <BoardColumn label="" />
    </>
  );
};

export default BoardPage;
