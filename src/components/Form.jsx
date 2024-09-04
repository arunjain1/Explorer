// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";
import flagEmoji from '../utility/flagEmoji.jsx';
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cityContext } from "../context/cityProvider.jsx";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BaseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji,setEmoji] = useState("");
  const [isLoadingGeocoding,setIsLoadingGeocoding] = useState(false);
  const [geoCodingError,setGeoCodingError] = useState("");
  const {createCity} = useContext(cityContext);
  const navigate = useNavigate("");
  const [lat,lng]  = useUrlPosition();
  console.log("lat",lat,"lng",lng);
  useEffect(()=>{
    async function fetchData(){
      try {
        if(!lat || !lng){
          return;
        }
        setIsLoadingGeocoding(true);
        setGeoCodingError("");
        const data = await fetch(`${BaseUrl}?latitude=${lat}&longitude=${lng}`);
        const res = await data.json();
        if(!res.countryCode){
          throw new Error("That's doesn't seems like a city.Click Somewhere else");
        }
        setCityName(res.city||res.locality||"");
        setCountry(res.countryName);
        setEmoji(convertToEmoji(res.countryCode));
      } catch (error) {
        setGeoCodingError(error.message);
      }finally{
        setIsLoadingGeocoding(false);
      }
    }
    fetchData();
  },[lat,lng]);

  async function handleSubmit(e){
    e.preventDefault();
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position : {lat,lng}
    }
    console.log(newCity);
    await createCity(
      newCity
    );
    navigate("/app/cities");
  }

  if(geoCodingError){
    return <Message message={geoCodingError}/>
  }

  if(!lat || !lng){
    return <Message message={"Start by clicking on Map"}/>
  }

  if(isLoadingGeocoding){
    return <Spinner/>
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {emoji && <span className={styles.flag}>{flagEmoji(emoji)}</span>}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          dateFormat={"dd/MM/yyyy"}
          selected={date} onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="primary" action ={(e)=>{
          e.preventDefault();
          navigate(-1);
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
