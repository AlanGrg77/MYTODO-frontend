import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/authUser/Login"
import Register from "./pages/authUser/Register"

function App() {
  
  return (
   <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
   </BrowserRouter>
   </>
  )
}

export default App
