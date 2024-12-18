import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import WeatherDetails from "../../components/WeatherDetails/WeatherDetails";
import styles from "./MyCityPage.module.css";
import { useEffect, useState } from "react";
import { HourlyTemperature } from "../../components/HourlyTemperature/HourlyTemperature";
import OtherDetails from "../../components/OtherDetails/OtherDetails";
import WeatherForecast from "../../components/WeatherForecast/WeatherForecast";

export default function MyCityPage() {
  const navigate = useNavigate();
  const cityName = localStorage.getItem("city-name");

  useEffect(() => {
    if (!cityName) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.firstRow}>
          <WeatherDetails cityName={cityName} />
          <HourlyTemperature cityName={cityName} />
        </div>
        <div className={styles.secondRow}>
          <OtherDetails cityName={cityName} />
          <WeatherForecast cityName={cityName} />
        </div>
      </div>
    </div>
  );
}
