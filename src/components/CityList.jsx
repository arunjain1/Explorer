import React,{useContext} from 'react'
import styles from './CityList.module.css';
import {cityContext} from '../context/cityProvider.jsx';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
function CityList() {
  const {cities,isLoading} = useContext(cityContext);
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
    <ul className={styles.cityList}>
    {cities.map(city => <CityItem city = {city} key={city.id}/>)}
    </ul>
  )
}

export default CityList