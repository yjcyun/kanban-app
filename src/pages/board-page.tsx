import BoardColumn from "../components/ui/board-column";

const tasks = [
  {
    title: "Design settings and search pages",
  },
];

const BoardPage = () => {
  return (
    <>
      <BoardColumn tasks={tasks} label="todo" length={3} />
      <BoardColumn tasks={tasks} label="doing" length={5} />
      <BoardColumn tasks={tasks} label="done" length={8} />
      <BoardColumn label="" />
    </>
  );
};

export default BoardPage;
