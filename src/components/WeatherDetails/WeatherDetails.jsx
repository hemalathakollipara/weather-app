import { useEffect, useState } from "react";
import { getGeoInfo, getWeather } from "../../api";
import styles from "./WeatherDetails.module.css";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

export default function WeatherDetails({ cityName }) {
  // const [geoInfo, setGeoInfo] = useState(null)
  // const [weather, setWeather] = useState(null)

  const [geoInfo, setGeoInfo] = useState({
    name: "Tenali",
    local_names: {
      pa: "ਤੇਨਾਲੀ",
      te: "తెనాలి",
      mr: "तेनाली",
      ja: "テーナーリー",
      en: "Tenali",
      ta: "தெனாலி",
      kn: "ತೆನಾಲಿ",
      hi: "तेनाली",
      ml: "തെനാലി",
    },
    lat: 16.2377735,
    lon: 80.6464219,
    country: "IN",
    state: "Andhra Pradesh",
  });
  const [weather, setWeather] = useState({
    coord: {
      lon: 80.6464,
      lat: 16.2378,
    },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04n",
      },
    ],
    base: "stations",
    main: {
      temp: 21.6,
      feels_like: 22.17,
      temp_min: 21.6,
      temp_max: 21.6,
      pressure: 1013,
      humidity: 90,
      sea_level: 1013,
      grnd_level: 1011,
    },
    visibility: 10000,
    wind: {
      speed: 2.49,
      deg: 71,
      gust: 4.72,
    },
    clouds: {
      all: 100,
    },
    dt: 1734443884,
    sys: {
      type: 2,
      id: 2083890,
      country: "IN",
      sunrise: 1734397124,
      sunset: 1734437310,
    },
    timezone: 19800,
    id: 1254757,
    name: "Thenali",
    cod: 200,
  });

  const [isLoading, setIsLoading] = useState(false);

  async function fetchWeather() {
    try {
      setIsLoading(true);
      const data = await getGeoInfo(cityName);
      const weather = await getWeather(data[0].lat, data[0].lon);
      setGeoInfo(data[0]);
      setWeather(weather);
      console.log({ geoInfo: data[0], weather });
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // fetchWeather();
  }, []);

  if (!geoInfo || !weather || isLoading) return <div>Loading...</div>;

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
              <Droplets />
            </div>
            <div>
              <h4>Humidity</h4>
              <p>{weather.main.humidity} %</p>
            </div>
          </div>
          <div className={styles.detail}>
            <div>
              <Wind />
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
