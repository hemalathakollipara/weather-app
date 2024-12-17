import { useNavigate, useSearchParams } from "react-router-dom";
import WeatherDetails from "../../components/WeatherDetails/WeatherDetails";
import styles from "./CityPage.module.css";

export default function CityPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cityName = searchParams.get("city");
  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          navigate("/my-city");
        }}
      >
        Back
      </button>
      <WeatherDetails cityName={cityName} />
    </div>
  );
}
