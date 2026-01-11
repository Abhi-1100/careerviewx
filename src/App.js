import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CareerAfter10 from "./pages/CareerAfter10";
import CareerAfter12 from "./pages/CareerAfter12";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/after-10" element={<CareerAfter10 />} />
        <Route path="/after-12" element={<CareerAfter12 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
