import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Parts from "./components/Parts/Parts";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import PartForm from "./components/Parts/PartForm/PartForm";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";
import { orderAxios } from "./custom-axios/axios";

const App = () => {
  const [createOrder, setCreateOrder] = useState("");

  const addToCart = (item) => {
    orderAxios
      .post("/addOrderItem", null, {
        params: {
          id: item.id,
          name: item.name,
          price: item.price,
        },
      })
      .then((response) => {
        if (response.data === "order not created") {
          setCreateOrder("You need to create order first.");
        } else {
          setCreateOrder("");
        }
      });
  };

  return (
    <React.Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/parts"
          element={<Parts addToCart={addToCart} createOrder={createOrder} />}
        />
        <Route path="/addPhonePart" element={<PartForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
