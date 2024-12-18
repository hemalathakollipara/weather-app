import { useNavigate, useSearchParams } from "react-router-dom";
import WeatherDetails from "../../components/WeatherDetails/WeatherDetails";
import styles from "./CityPage.module.css";
import Header from "../../components/Header/Header";
import { HourlyTemperature } from "../../components/HourlyTemperature/HourlyTemperature";
import OtherDetails from "../../components/OtherDetails/OtherDetails";
import WeatherForecast from "../../components/WeatherForecast/WeatherForecast";
import { useEffect, useState } from "react";
import { getForecast, getGeoInfo, getWeather } from "../../api";

export default function CityPage() {
  const [searchParams] = useSearchParams();
  const cityName = searchParams.get("city");

  const navigate = useNavigate();
  const cityNameInLs = localStorage.getItem("city-name");

  useEffect(() => {
    if (!cityNameInLs) {
      navigate("/");
    }
  }, [navigate]);

  const [geoInfo, setGeoInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    try {
      setIsLoading(true);
      const data = await getGeoInfo(cityName);
      const weather = await getWeather(data[0].lat, data[0].lon);
      const forecast = await getForecast(data[0].lat, data[0].lon);
      setGeoInfo(data[0]);
      setWeather(weather);
      setForecast(forecast);
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!geoInfo || !weather || isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.firstRow}>
          <WeatherDetails geoInfo={geoInfo} weather={weather} />
          <HourlyTemperature geoInfo={geoInfo} forecast={forecast} />
        </div>
        <div className={styles.secondRow}>
          <OtherDetails weather={weather} />
          <WeatherForecast forecast={forecast} />
        </div>
      </div>
    </div>
  );
}
