import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Produtos from "./pages/Produtos/Produtos";
import Produtoscheck from "./pages/ProdutosCheck/ProdutosCheck";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';



function Routas() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtoscheck" element={<Produtoscheck />} />

        <Route element={<PrivateRoute roles={['user', 'admin']} />}>
          <Route path="/profile" element={<Profile />} />
          
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default Routas;
