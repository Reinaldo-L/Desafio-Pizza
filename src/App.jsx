import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screen/Home/Home";
import PizzaDetail from "./screen/PizzaDetail";
import Cart from "./screen/Cart";
import Error404 from "./screen/Error404";
import AppContext from "./context/PizzaContext";
import PizzaNavbar from "./components/Navbar/PizzaNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AppContext>
      <div className="App">
        <PizzaNavbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pizza/:id" element={<PizzaDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </AppContext>
  );
}

export default App;





