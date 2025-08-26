import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Signin } from "./components/Signin"
import { Signup } from "./components/Signup"
import { Dashboard } from "./pages/Dashboard"
import { AuthProvider, useAuth } from "./hooks/AuthContext"
import type { JSX } from "react"

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, loading} = useAuth();

  if(loading){

    return<div>loading ...</div>
  }
  if (!user) return <Navigate to="/signin" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<Signup />}/>
    <Route path="/signin" element={<Signin />}/>
    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
