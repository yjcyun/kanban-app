import BoardCard from "./board-card";
import ColumnTitle from "./column-title";
import NewColumn from "./new-column";

type BoardColumnProps = {
  label: string;
  length?: number;
  tasks?: { title: string }[];
};

const BoardColumn = ({ label, length, tasks }: BoardColumnProps) => {
  return (
    <div className="w-[280px] flex flex-col h-full">
      <ColumnTitle label={label} length={length!} />
      {tasks ? (
        <div className="grid gap-5">
          {tasks.map((task) => (
            <BoardCard key={task.title} />
          ))}
        </div>
      ) : (
        <NewColumn />
      )}
    </div>
  );
};

export default BoardColumn;