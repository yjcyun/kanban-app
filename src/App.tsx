import "./style/global.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from "./pages/board-page";
import Layout from "./components/layout/layout";
import { getLocalData } from "./store/task-slice";
import { useDispatch } from "react-redux";
import data from "./data.json";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data.boards);
    dispatch(getLocalData(data.boards));
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
