import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layouts/AdminLayout";
import Home from "./pages/Home";
import "./App.css"
import Login from "./pages/auth/Login";
import Toast from "./components/ui/Toast";
import Loader from "./components/ui/Loader";
import { useSelector } from "react-redux";



function App() {
  const {isLoading} = useSelector((state)=>state.loader);

  const {toast} = useSelector((state)=>state.toast);
 
  return (
    <BrowserRouter>
   {toast && toast.status && <Toast type={toast.type} content={toast.content}/>}
   {isLoading && <Loader/>}
      <Routes>

        {/* Whole admin panel wrapped inside AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Home/>} />
   
        </Route>
        <Route path="/login" element={<Login/>}>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
