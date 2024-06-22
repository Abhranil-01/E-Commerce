import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout/Layout";

import "./App.scss";
import React from "react";

const Home = React.lazy(() => import("./Pages/Home/Home"));
const Store = React.lazy(() => import("./Pages/Store/Store"));
const LoginRegister = React.lazy(() =>
  import("./Pages/LoginRegister/LoginRegister")
);
const SubCategory = React.lazy(() => import("./Pages/SubCategory/SubCategory"));
const SingleProductPage = React.lazy(() =>
  import("./Pages/SingleProductPage/SingleProductPage")
);
const AddtoCart = React.lazy(() => import("./Pages/AddToCart/AddtoCart"));
const Order = React.lazy(() => import("./Pages/Order/Order"));
const CheckOutPage = React.lazy(() =>
  import("./Pages/CheckOutPage/CheckOutPage")
);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":name" element={<LoginRegister />} />
          <Route path="items/:name/:id" element={<SubCategory />} />
          <Route path=":productName/:id" element={<SingleProductPage />} />
          <Route path="addtocart" element={<AddtoCart />} />
          <Route path=":nameOne/:nametwo/:id/:filter" element={<Store />} />
          <Route path="orders" element={<Order />} />
          <Route path="checkout" element={<CheckOutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
