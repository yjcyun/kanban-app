import { TaskType } from "@type/data";
import BoardCard from "./board-card";
import ColumnTitle from "./column-title";
import NewColumn from "./new-column";

type BoardColumnProps = {
  label: string;
  length?: number;
  tasks?: TaskType[];
};

const BoardColumn = ({ label, length, tasks }: BoardColumnProps) => {
  return (
    <div className="w-[280px] flex flex-col h-full">
      <ColumnTitle label={label.toLowerCase()} length={length!} />
      {tasks ? (
        <div className="grid gap-5">
          {tasks.map((task) => (
            <BoardCard
              key={task.title}
              subtasks={task.subtasks}
              title={task.title}
              description={task.description}
              status={task.status}
              id={task.id}
            />
          ))}
        </div>
      ) : (
        <NewColumn />
      )}
    </div>
  );
};

export default BoardColumn;
