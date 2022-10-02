import { useEffect } from "react";
import BoardColumn from "@ui/board-column";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { selectTab } from "@store/board-slice";

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

  return (
    <>
      {boards[selectedBoardIndex]?.columns.map((column) => (
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

export default MainBoard;
