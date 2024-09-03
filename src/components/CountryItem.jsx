import styles from "./CountryItem.module.css";
import flagEmoji from '../utility/flagEmoji.jsx';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{flagEmoji(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
