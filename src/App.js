import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CareerAfter10 from "./pages/CareerAfter10";
import CareerAfter12 from "./pages/CareerAfter12";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
