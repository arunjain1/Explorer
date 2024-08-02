import React from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
function Map() {
  const [searchParams,setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer} onClick={()=>{
      navigate("form");
    }}>
     <h1>Map</h1>
     <h1>Lat : {lat} & Lng : {lng}</h1>
     <button onClick={(e)=>{
      e.stopPropagation();
      setSearchParams({lat : 50,lng: 26})
     }}>Set Cord</button>
    </div>
  )
}

export default Map