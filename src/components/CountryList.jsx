import React, { useContext } from 'react'
import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import { cityContext } from '../context/cityProvider';



function CountryList() {
  const {cities,isLoading} = useContext(cityContext);
  const countries = cities.reduce((acc,city)=>{
    if(!acc.map((el)=>el.country).includes(city.country)){
      return [...acc,{country  : city.country, emoji : city.emoji}]
    }
    else{
        return acc;
    }
  },[]);
  if(isLoading){
    return(
        <Spinner/>
    )
  }
  if(cities.length==0){
    return(
        <Message message="Add your first city by clicking on a city on the map"/>
    )
  }
  return (
    <ul className={styles.countryList}>
    {countries.map(country => <CountryItem country = {country} key={country}/>)}
    </ul>
  )
}

export default CountryList