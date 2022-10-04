import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { selectTab } from "@store/board-slice";
import { dragEndTask } from "@store/task-slice";
import BoardColumn from "@ui/board-column";
import EmptyBoard from "./empty-board";

const MainBoard = () => {
  const { boards } = useAppSelector((state) => state.tasks);
  const boardTab = useAppSelector((state) => state.boardTab);
  const currentBoard = boards.find((board) => board.name === boardTab);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Set default boardTab on load
    if (boards.length > 0 && !currentBoard) {
      dispatch(selectTab(boards[0].name));
    }
    // fetch from local storage
    else if (currentBoard) {
      dispatch(selectTab(currentBoard.name));
    }
  }, [dispatch, boards, currentBoard]);

  if (boards.length === 0) {
    return <div>Loading</div>;
  }

  // Find the selected board index
  const selectedBoardIndex = boards.findIndex(
    (board) => board.name === boardTab
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      dragEndTask({
        currentBoardIndex: selectedBoardIndex,
        destination,
        source,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {boards[selectedBoardIndex]?.columns.map((column, index) => (
        <BoardColumn
          tasks={column.tasks}
          label={column.name}
          length={column.tasks.length}
          key={column.name}
          id={column.id}
          index={index}
        />
      ))}
      {boards[selectedBoardIndex]?.columns.length > 0 ? (
        <BoardColumn label="" />
      ) : (
        <EmptyBoard />
      )}
    </DragDropContext>
  );
};

export default MainBoard;
