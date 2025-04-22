import React from 'react';
import ReactDOM from 'react-dom/client';
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
import MyLinks from './App';
import { CookiesProvider } from 'react-cookie';

// function MyLinks() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path='/dashboard' element={<Dashboard />} />
//                 <Route path="/forgotpassword" element={<ForgotPassword />} />
//                 <Route path="/category" element={<Category />} />
//                 <Route path="/category/addcategory" element={<AddCategory />} />
//                 <Route path="/category/editcategory" element={<EditCategory />} />
//                 <Route path="/products" element={<Products />} />
//                 <Route path="/products/addproduct" element={<AddProduct />} />
//                 <Route path="/products/editproduct" element={<EditProduct />} />
//                 <Route path="/products/viewproduct" element={<ViewProduct />} />
//                 <Route path='/orders' element={<Orders />} />
//                 <Route path='/vieworder' element={<ViewOrder />} />
//                 <Route path='/users' element={<Users />} />
//                 <Route path='/changepassword' element={<ChangePassword />} />
//                 <Route path='*' element={<ErrorPage />} />
//             </Routes>
//         </BrowserRouter>
//     )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>  {/* Wrap your app with CookiesProvider */}
      <MyLinks />
    </CookiesProvider>
  );