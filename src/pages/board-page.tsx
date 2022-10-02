import { useEffect } from "react";
import BoardColumn from "@ui/board-column";
import { useAppDispatch, useAppSelector } from "@hooks/useStore";
import { selectTab } from "@store/board-slice";

const BoardPage = () => {
  const { boards } = useAppSelector((state) => state.tasks);
  const boardTab = useAppSelector((state) => state.boardTab);
  const dispatch = useAppDispatch();

  // Set default boardTab on load
  useEffect(() => {
    if (boards.length > 0) {
      dispatch(selectTab(boards[0].name));
    }
  }, [dispatch, boards]);

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

export default BoardPage;
