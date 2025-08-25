
import { SignIn } from "./components/Signin";
import { SignUp } from "./components/SignUp";
import "./index.css";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
             <Route path="/dashboard" element={<Dashboard />} />
           

  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
