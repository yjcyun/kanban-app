import { useEffect } from "react";
import Layout from "@components/layout/layout";
import MainBoard from "@components/layout/main-board";
import { useAppDispatch } from "@hooks/useStore";
import { getLocalData, setBoardColumns } from "@store/task-slice";
import "@style/global.css";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import("./data.json");
        const data = response.boards;
        dispatch(getLocalData(data));
        dispatch(setBoardColumns(data[0].name));
      } catch (error) {
        console.log(error);
      }
    };

    if (!localStorage.getItem("persist:kanban-app")) {
      fetchData();
    }
  }, [dispatch]);

  return (
    <Layout>
      <MainBoard />
    </Layout>
  );
};

export default App;
