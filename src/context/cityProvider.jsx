import React,{useState,useEffect,createContext} from "react";
const baseURL = "http://localhost:9000";
const cityContext = createContext();
function CityProvider({ children }) {
  
  const [cities,setCities] = useState([]);
  const [isLoading,setIsLoading] =  useState(false);
  const [currentCity,setCurrentCity] = useState({
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  });

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

  const getCity = async(id)=>{
    try{
      setIsLoading(true);
      const res = await fetch(`${baseURL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    }
    catch{
     alert("There is error retrieving the data");  
    }
    finally{
     setIsLoading(false);  
    }
  }
  
  return (
    <cityContext.Provider value={{
      cities,
      isLoading,
      getCity,
      currentCity
    }}>
      {children}
    </cityContext.Provider>
  )
}

export {CityProvider,cityContext};
