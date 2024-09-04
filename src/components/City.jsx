import { useParams, useSearchParams,useNavigate} from "react-router-dom";
import styles from "./City.module.css";
import { cityContext } from "../context/cityProvider";
import { useEffect ,useContext} from "react";
import flagEmoji from '../utility/flagEmoji.jsx';
import Spinner from "./Spinner";
import Button from "./Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  const {getCity,currentCity,isLoading} = useContext(cityContext);
  const {id} = useParams();
  const navigate = useNavigate();
  const [searchParams,setSearchParams] = useSearchParams();
  // return(
  //   <div>
  //      <h1>{id}</h1>
  //      <h1>Lat : {searchParams.get("lat")} & Lng : {searchParams.get("lng")} </h1>
  //   </div>
  // )


  // const currentCity = 
  // {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };

  useEffect(() => {
    getCity(id)
  },[id])

  const { cityName, emoji, date, notes } = currentCity;
  console.log("currentCity",currentCity);

  if(isLoading ||  Object.keys(currentCity).length === 0){
    return <Spinner/>
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagEmoji(emoji)}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      {/* <div>
        <ButtonBack />
      </div> */}
      <div className={styles.buttons}>
      <Button type="back" action={()=>{
        navigate(-1);
      }}>&larr; Back</Button>
      </div>
    </div>
  );
}

export default City;
