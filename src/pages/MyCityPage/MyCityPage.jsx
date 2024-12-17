import Header from "../../components/Header/Header";
import WeatherDetails from "../../components/WeatherDetails/WeatherDetails";
import styles from "./MyCityPage.module.css";

export default function MyCityPage() {
  const cityName = localStorage.getItem("city-name");
  return (
    <div className={styles.container}>
      <Header />
      <WeatherDetails cityName={cityName} />
    </div>
  );
}
