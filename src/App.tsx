import "./style/global.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from "./pages/board-page";
import Layout from "./components/layout/layout";
import { getLocalData, setBoardColumns } from "./store/task-slice";
import { useDispatch } from "react-redux";
import data from "./data.json";

const App = () => {
  const dispatch = useDispatch();

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

    fetchData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<BoardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
