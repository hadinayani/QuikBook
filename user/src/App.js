import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout';
import ErrorPage from './pages/404';
import Contact from './pages/contact';
import AboutUs from './pages/aboutus';
import ProductCategory from './pages/product-category';
import ShopCart from './pages/shop-cart';
import Checkout from './pages/checkout';
import Register from './pages/register';
import Login from './pages/login';
import ForgotPassword from './pages/forgot-password';
import Home from './pages/home';
import ChangePassword from './pages/change-password';
import Category from './pages/category';

import SingleProduct from './pages/single-product';
import Logout from './pages/logout';
import OrderHistory from './pages/orderhistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Protected Routes Inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Default route */}
          <Route path="contactus" element={<Contact />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="productdetails/:id" element={<SingleProduct />} />
          <Route path="productcategory/:id" element={<ProductCategory />} />
          <Route path="cart" element={<ShopCart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path='changepassword' element ={<ChangePassword/>} />
          <Route path='category' element ={<Category/>} />
          <Route path='logout' element = {<Logout />} />
          <Route path='history' element = {<OrderHistory />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
