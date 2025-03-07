import React from 'react'
import Home from './Pages/Home'
import ProductList from './Pages/ProductList'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import AboutUs from './Pages/AboutUs'
import BestDeal from './Pages/BestDeal'
import ThankYouPage from './Pages/ThankYou'
import UserLoginRegister from './Pages/UserLoginRegister'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux'
import Profile from './Pages/Profile'
import Checkout from './Pages/Checkout'

const App = () => {
  const user = useSelector(state=>state.user);
  return(
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/products/:category" element={<ProductList/>}></Route>
        <Route exact path="/product/:id" element={<Product/>}></Route>
        <Route exact path="/aboutus" element={<AboutUs/>}></Route>
        <Route exact path="/deals" element={<BestDeal/>}></Route>
        <Route exact path="/cart" element={<Cart/>}></Route>
        <Route exact path="/checkout" element={<Checkout/>}></Route>
        <Route exact path="/profile" element={user.logout===false? <Profile/>:<Navigate to ="/"/>}></Route>
        <Route exact path="/login" element={user.logout===false? <Navigate to ="/"/> : <UserLoginRegister/>}></Route>
        <Route exact path="/success" element={<ThankYouPage/>}></Route>
      </Routes>
    </Router>
  )
}
export default App
