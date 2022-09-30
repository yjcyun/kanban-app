import "./style/global.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from "./pages/board-page";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
