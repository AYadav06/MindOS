import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Signin } from "./components/Signin"
import { Signup } from "./components/Signup"
import { Dashboard } from "./pages/Dashboard"
function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/signin" element={<Signin />}/>
  </Routes>
  </BrowserRouter>
  )
}

export default App
