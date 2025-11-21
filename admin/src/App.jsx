import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout";
import Home from "./pages/Home";
import "./App.css"



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Whole admin panel wrapped inside AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home/>} />
   
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
