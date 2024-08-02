import { useState,useEffect } from 'react';
import "./components/Form.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import Homepage from './pages/Homepage.jsx';
import Product from './pages/Product.jsx';
import Pricing from './pages/Pricing.jsx';
import Login from './pages/Login.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AppLayout from './pages/AppLayout.jsx';
import Form from './components/Form.jsx';
import CityList from './components/CityList.jsx';
import CountryList from './components/CountryList.jsx';
import City from './components/City.jsx';

const baseURL = "http://localhost:9000";

function App() {
  const [cities,setCities] = useState([]);
  const [isLoading,setIsLoading] =  useState(false);

  useEffect(()=>{
   async function fetchCities(){
     try{
       setIsLoading(true);
       const res = await fetch(`${baseURL}/cities`);
       const data = await res.json();
       setCities(data);
     }
     catch{
      alert("There is error retrieving the data");  
     }
     finally{
      setIsLoading(false);  
     }
   }
   fetchCities();
  },[])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path="/" element={<Homepage />} /> */}
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities"/>}/>
          <Route path ="cities" element={<CityList cities={cities} isLoading = {isLoading}/>}/>
          <Route path ="cities/:id" element={<City/>}/>
          <Route path ="countries" element={<CountryList cities={cities} isLoading = {isLoading}/>}/>
          <Route path ="form" element={<Form/>}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
