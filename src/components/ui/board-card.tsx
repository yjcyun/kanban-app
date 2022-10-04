import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "@hooks/useStore";
import { openModal } from "@store/modal-slice";
import { TaskType } from "@type/data";

interface BoardCardProps extends TaskType {
  index: number;
}

const BoardCard = (props: BoardCardProps) => {
  const { title, subtasks, index, id } = props;

  const dispatch = useAppDispatch();

  const completedSubtasks = subtasks.filter((task) => task.isCompleted).length;

  const onCardClick = () => {
    dispatch(openModal({ type: "view-task", data: props }));
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="px-4 py-6 bg-secondary-color rounded-lg shadow-card cursor-pointer group"
            onClick={onCardClick}
          >
            <h4 className="heading-md heading-color mb-2 group-hover:text-main-purple">
              {title}
            </h4>
            <p className="body-md">
              {completedSubtasks} of {subtasks.length} substasks
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default BoardCard;
