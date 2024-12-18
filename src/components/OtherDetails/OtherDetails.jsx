import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import { format } from "date-fns";
import { getGeoInfo, getWeather } from "../../api";
import { useEffect, useState } from "react";
import styles from "./OtherDetails.module.css";

export default function OtherDetails({ cityName }) {
  const [geoInfo, setGeoInfo] = useState(null);
  const [weather, setWeather] = useState(null);

  // const [geoInfo, setGeoInfo] = useState({
  //   name: "Tenali",
  //   local_names: {
  //     pa: "ਤੇਨਾਲੀ",
  //     te: "తెనాలి",
  //     mr: "तेनाली",
  //     ja: "テーナーリー",
  //     en: "Tenali",
  //     ta: "தெனாலி",
  //     kn: "ತೆನಾಲಿ",
  //     hi: "तेनाली",
  //     ml: "തെനാലി",
  //   },
  //   lat: 16.2377735,
  //   lon: 80.6464219,
  //   country: "IN",
  //   state: "Andhra Pradesh",
  // });
  // const [weather, setWeather] = useState({
  //   coord: {
  //     lon: 80.6464,
  //     lat: 16.2378,
  //   },
  //   weather: [
  //     {
  //       id: 804,
  //       main: "Clouds",
  //       description: "overcast clouds",
  //       icon: "04n",
  //     },
  //   ],
  //   base: "stations",
  //   main: {
  //     temp: 21.6,
  //     feels_like: 22.17,
  //     temp_min: 21.6,
  //     temp_max: 21.6,
  //     pressure: 1013,
  //     humidity: 90,
  //     sea_level: 1013,
  //     grnd_level: 1011,
  //   },
  //   visibility: 10000,
  //   wind: {
  //     speed: 2.49,
  //     deg: 71,
  //     gust: 4.72,
  //   },
  //   clouds: {
  //     all: 100,
  //   },
  //   dt: 1734443884,
  //   sys: {
  //     type: 2,
  //     id: 2083890,
  //     country: "IN",
  //     sunrise: 1734397124,
  //     sunset: 1734437310,
  //   },
  //   timezone: 19800,
  //   id: 1254757,
  //   name: "Thenali",
  //   cod: 200,
  // });

  const [isLoading, setIsLoading] = useState(false);

  async function fetchWeather() {
    try {
      setIsLoading(true);
      const data = await getGeoInfo(cityName);
      const weather = await getWeather(data[0].lat, data[0].lon);
      setGeoInfo(data[0]);
      setWeather(weather);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!geoInfo || !weather || isLoading) return <div>Loading...</div>;

  const { wind, main, sys } = weather;

  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Weather Details</h3>
      </div>
      <div>
        <div className={styles.detailsContainer}>
          {details.map((detail) => (
            <div key={detail.title} className={styles.detail}>
              <detail.icon
                style={{ color: detail.color }}
                className={styles.icon}
              />
              <div className={styles.detailContent}>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
