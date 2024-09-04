import React, { useContext, useEffect } from "react";
import styles from "./Map.module.css";
import { useNavigate} from "react-router-dom";
import flagEmoji from '../utility/flagEmoji.jsx';
import "leaflet/dist/leaflet.css";
import {MapContainer,TileLayer,Marker,Popup, useMap, useMapEvent} from "react-leaflet";
import { cityContext } from "../context/cityProvider";
import {useGeolocation} from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
function Map() {
  
  const navigate = useNavigate();
  const [lat,lng] = useUrlPosition();
  const [mapPosition,setMapPosition] = React.useState([40,0]);
  const {cities} = useContext(cityContext);
  const {isLoading : isLoadingPosition,position : geolocationPosition,getPosition} = useGeolocation();

  useEffect(()=>{
    if(lat && lng){
      setMapPosition([lat,lng]);
    }
  },[lat,lng]);

  useEffect(()=>{
    if(geolocationPosition){
      setMapPosition([geolocationPosition.lat,geolocationPosition.lng]);
    }
  },[geolocationPosition])

  return (
    <div
      className={styles.mapContainer}
      
    >
      <Button type="position" action={getPosition}>{isLoadingPosition?"Loading...":"Use your Position"}</Button>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city)=>(<Marker position={[city.position.lat,city.position.lng]}>
          <Popup>
            <span>{flagEmoji(city.emoji)}</span><span>{city.cityName}</span>
          </Popup>
        </Marker>))}
        <ChangePosition position = {mapPosition}/>
        <DetectClick/>
      </MapContainer>
    </div>
  );
}

function ChangePosition({position}){
  const map = useMap();
  map.setView(position);
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({
    click : (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}

export default Map;
