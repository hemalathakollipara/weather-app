import styles from "./WeatherDetails.module.css";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

export default function WeatherDetails({ geoInfo, weather }) {
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <div className={styles.regionContainer}>
          <span>
            <h3>{geoInfo.name}</h3>
            <p>, {geoInfo.state}</p>
          </span>
          <p>{geoInfo.country}</p>
        </div>
        <div className={styles.tempContainer}>
          <h1>{weather.main.temp}&deg;</h1>
          <div>
            <p>Feels like {weather.main.feels_like}&deg;</p>
            <div>
              <p>
                <ArrowDown size={16} />
                {weather.main.temp_min}&deg;
              </p>
              <p>
                <ArrowUp size={16} />
                {weather.main.temp_max}&deg;
              </p>
            </div>
          </div>
        </div>
        <div className={styles.otherDetails}>
          <div className={styles.detail}>
            <div>
              <Droplets className={styles.icon} />
            </div>
            <div>
              <h4>Humidity</h4>
              <p>{weather.main.humidity} %</p>
            </div>
          </div>
          <div className={styles.detail}>
            <div>
              <Wind className={styles.icon} />
            </div>
            <div>
              <h4>Wind Speed</h4>
              <p>{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        />
        <p>{weather.weather[0].description}</p>
      </div>
    </div>
  );
}
