import { useSearchParams } from "react-router-dom";
import WeatherDetails from "../../components/WeatherDetails/WeatherDetails";
import styles from "./CityPage.module.css";
import Header from "../../components/Header/Header";
import { HourlyTemperature } from "../../components/HourlyTemperature/HourlyTemperature";
import OtherDetails from "../../components/OtherDetails/OtherDetails";
import WeatherForecast from "../../components/WeatherForecast/WeatherForecast";

export default function CityPage() {
  const [searchParams] = useSearchParams();
  const cityName = searchParams.get("city");
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
