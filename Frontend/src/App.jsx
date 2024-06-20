import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Layout from "./Layout/Layout"
import Store from './Components/Store/Store'
import ProductImageSlider from "./Pages/SingleProductPage/SingleProductPage"
import AddtoCart from "./Pages/AddToCart/AddtoCart"
import SubCategory from "./Components/SubCategory/SubCategory"
import LoginRegister from "./Pages/LoginRegister/LoginRegister"
import './App.scss'
import Order from "./Pages/Order/Order"
import CheckOutPage from "./Pages/CheckOutPage/CheckOutPage"
import OrderDetails from "./Pages/OrderDetails/OrderDetails"
function App() {

  return (
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path=":name" element={<LoginRegister/>}/>
        <Route path="items/:name/:id" element={<SubCategory/>}/>
        <Route path=":productName/:id" element={<ProductImageSlider/>}/>
        <Route path="addtocart" element={<AddtoCart/>}/>
        <Route path=":nameOne/:nametwo/:id/:filter" element={<Store/>}/>
        <Route path="orders" element={<Order/>}/>
        <Route path="checkout" element={<CheckOutPage/>}/>
   
      </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App
