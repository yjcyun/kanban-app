import "./style/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from "./pages/board-page";
import Layout from "./components/layout/layout";

const App = () => {
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
