import { Droppable } from "react-beautiful-dnd";
import { TaskType } from "@type/data";
import BoardCard from "./board-card";
import ColumnTitle from "./column-title";
import NewColumn from "./new-column";

type BoardColumnProps = {
  label: string;
  length?: number;
  tasks?: TaskType[];
  id?: string;
  index?: number;
};

const BoardColumn = ({ label, length, tasks, id, index }: BoardColumnProps) => {
  return (
    <div className="w-[280px] flex flex-col h-full shrink-0 last:pr-6">
      <ColumnTitle label={label.toLowerCase()} length={length!} id={index!} />
      {tasks ? (
        <Droppable droppableId={id!}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`grid gap-5 border-dashed pb-6`}
            >
              {tasks.map((task, index) => {
                const taskId = task.id.toString();
                return (
                  <BoardCard
                    key={taskId}
                    subtasks={task.subtasks}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    id={taskId}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ) : (
        <NewColumn />
      )}
    </div>
  );
};

export default BoardColumn;
