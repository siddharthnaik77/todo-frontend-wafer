import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import ViewAllTask from "./pages/ViewAllTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/view-all" element={<ViewAllTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
