import React,{useState,useEffect,createContext,useReducer} from "react";
const baseURL = "http://localhost:9000";
const cityContext = createContext();
function CityProvider({ children }) {
  
  const initialState = {
    isLoading : false,
    currentCity : {},
    cities : [],
    error : ""
  }

  const [{isLoading,currentCity,cities,error},dispatch] = useReducer(reducer,initialState);

  function reducer(state,action){
    switch (action.type){
      case "loading":
        return {...state,isLoading:true}
      case "cities/loaded":
        return {...state,isLoading:false,cities : action.payload}
      case "city/fetched" :
        return {...state,isLoading:false,currentCity : action.payload}
      case "city/created":
        return {...state,isLoading:false,currentCity : action.payload,cities:[...state.cities,action.payload]}
      case "city/deleted":
        return {...state,isLoading:false,cities: state.cities.filter((city)=> city.id!==action.payload)}
      case "rejected":
        return {...state,isLoading:false,error : action.payload}
      default:
        throw new Error("Unkown Action Type")
    }
  }

  useEffect(()=>{
   async function fetchCities(){
    dispatch({type:"loading"})
     try{
       const res = await fetch(`${baseURL}/cities`);
       const data = await res.json();
       dispatch({type:"cities/loaded",payload:data})
     }
     catch{
      dispatch({type:"rejected",payload:"There is error retrieving the data"})
     }
   }
   fetchCities();
  },[])

  const getCity = async(id)=>{
    dispatch({type:'loading'})
    try{
      const res = await fetch(`${baseURL}/cities/${id}`);
      const data = await res.json();
      dispatch({type:"city/fetched",payload:data})
    }
    catch{
      dispatch({type:"rejected",payload:"There is error retrieving the data"})
    }
  }

  const createCity = async(data)=>{
    dispatch({type:"loading"})
    try{
      
      console.log("API",data);
      const res = await fetch(`${baseURL}/cities`,
        {
          method : "POST",
          body : JSON.stringify(data),
          headers : {
            'Content-Type' : 'application/json'
          }
        }
      );
      const response = await res.json();
      dispatch({type:"city/created",payload:response})
      console.log(data);
    }
    catch{
      dispatch({type:"rejected",payload:"There is error retrieving the data"})
    }
  }

  const deleteCity = async(id)=>{
    dispatch({type:"loading"})
    try{
      
      const res = await fetch(`${baseURL}/cities/${id}`,
        {
          method : "DELETE",
        }
      );
      const data = await res.json();
      dispatch({type:"city/deleted",payload:id})
    }
    catch{
      dispatch({type:"rejected",payload:"There is error retrieving the data"})
    }
  }
  
  return (
    <cityContext.Provider value={{
      cities,
      isLoading,
      getCity,
      createCity,
      deleteCity,
      currentCity
    }}>
      {children}
    </cityContext.Provider>
  )
}

export {CityProvider,cityContext};
