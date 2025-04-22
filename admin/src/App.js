// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Category from './category';
// import AddCategory from './add-category';
// import Products from './products';
// import AddProduct from './add-product';
// import Orders from './orders';
// import Users from './user';
// import ViewOrder from './view-order';
// import EditCategory from './edit-category';
// import EditProduct from './edit-product';
// import ViewProduct from './view-product';
// import ErrorPage from './404';
// import Login from './login';
// import ForgotPassword from './forgot-password';
// import ChangePassword from './change-password';
// import Dashboard from './dashboard';

// function MyLinks() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/category" element={<Category />} />
//         <Route path="/category/addcategory" element={<AddCategory />} />
//         <Route path="/category/editcategory" element={<EditCategory />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/products/addproduct" element={<AddProduct />} />
//         <Route path="/products/editproduct" element={<EditProduct />} />
//         <Route path="/products/viewproduct" element={<ViewProduct />} />
//         <Route path='/orders' element={<Orders />} />
//         <Route path='/vieworder' element={<ViewOrder />} />
//         <Route path='/users' element={<Users />} />
//         <Route path='/changepassword' element={<ChangePassword />} />
//         <Route path='*' element={<ErrorPage />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }
// export default MyLinks;


import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/login";
import Category from "./pages/category";
import AddCategory from "./pages/add-category";
import Products from "./pages/products";
import AddProduct from "./pages/add-product";
import Orders from "./pages/orders";
import Users from "./pages/user";
import ViewOrder from "./pages/view-order";
import EditCategory from "./pages/edit-category";
import EditProduct from "./pages/edit-product";
import ViewProduct from "./pages/view-product";
import ErrorPage from "./pages/404";
import ForgotPassword from "./pages/forgot-password";
import ChangePassword from "./pages/change-password";
import Dashboard from "./pages/dashboard";
import Logout from "./pages/logout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="category/add" element={<AddCategory />} />
          <Route path="category/edit/:id" element={<EditCategory />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/view/:id" element={<ViewProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/view/:id" element={<ViewOrder />} />
          <Route path="users" element={<Users />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="logout" element= {<Logout />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

