import React, { useContext, useEffect } from "react";
import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import flagEmoji from '../utility/flagEmoji.jsx';
import "leaflet/dist/leaflet.css";
import {MapContainer,TileLayer,Marker,Popup, useMap, useMapEvent} from "react-leaflet";
import { cityContext } from "../context/cityProvider";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mapPosition,setMapPosition] = React.useState([40,0]);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const {cities} = useContext(cityContext);

  useEffect(()=>{
    if(lat && lng){
      setMapPosition([lat,lng]);
    }
  },[lat,lng]);

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        // navigate("form");
      }}
    >
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
