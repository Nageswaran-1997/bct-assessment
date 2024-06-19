import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import Layout from "./components/Layout";
import Orders from "./pages/Orders";
import Favorite from "./pages/Favorite";
import Help from "./pages/Help";

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path="orders" element={<Orders/>} />
          <Route path="favorite" element={<Favorite/>} />
          <Route path="help" element={<Help/>} />
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
