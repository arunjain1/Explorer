import React, { useContext } from 'react'
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import flagEmoji from '../utility/flagEmoji.jsx';
import { cityContext } from '../context/cityProvider';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));


function CityItem({ city }) {
    const {currentCity,deleteCity} = useContext(cityContext);
    const { cityName, emoji, date,id ,position} = city;

    function deleteItem(e){
        e.preventDefault();
        deleteCity(id);
    }

    return (
        <li >
            <Link className={`${styles.cityItem} ${id===currentCity.id?styles["cityItem--active"]:""}`} to = {`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>{flagEmoji(emoji)}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn} onClick={deleteItem}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem