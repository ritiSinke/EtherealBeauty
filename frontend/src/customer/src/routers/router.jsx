import React from 'react';
import { createBrowserRouter, Route } from 'react-router-dom';
import App from '../App';
import Home from "../pages/home/Home";
import BrandPage from '../pages/brands/BrandPage';
import Search from '../pages/search/Search';
import ProductPage from '../pages/products/ProductPage';
import SingleProduct from '../pages/products/SingleProduct';
import WebcamCapture from '../pages/home/WebcamCapture';

import Login from '../components/Login';
import Register from '../components/Register';
import Checkout from '../pages/products/CheckoutPage';
import PaymentSuccess from '../pages/orders/PaymentSuccess';
import ViewOrders from '../pages/orders/ViewOrders';
import AqiPage from '../pages/aqi/AqiPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
        { path:"/", element: <Home/>},
        { path:"/brands/:brandName", element: <BrandPage/>},
        {path:"/search", element:<Search/>},
        {path:"/webcam", element:<WebcamCapture/>},
        {path:"/product", element:<ProductPage/>},
        {path:"/product/:id", element:<SingleProduct/>},
        {path:"/checkout", element:<Checkout/>},
        {path:"/payment-success", element:<PaymentSuccess/> },
        {path:"/orders", element:<ViewOrders/>},
        {path:"/aqi", element:<AqiPage/>},

 
    ]
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/register",
    element:<Register/>
  }
  
]);
// console.log("Routes Loaded:", router.routes);

export default router;