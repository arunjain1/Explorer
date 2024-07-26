import { useState } from 'react';
import "./components/Form.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import PageNotFound from './pages/PageNotFound.jsx';

function App() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Homepage/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="*" element={<PageNotFound/>}/>
       </>
    )
  );
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
