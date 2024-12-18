import styles from "./WeatherForecast.module.css";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";

export default function WeatherForecast({ forecast }) {
  const dailyForecasts = forecast.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {});

  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  const formatTemp = (temp) => `${Math.round(temp)}°`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>5-Day Forecast</h3>
      </div>
      <div>
        <div className={styles.content}>
          {nextDays.map((day) => (
            <div key={day.date} className={styles.forecastCard}>
              <div className={styles.day}>
                <p>{format(new Date(day.date * 1000), "EEE, MMM d")}</p>
                <p>{day.weather.description}</p>
              </div>

              <div className={styles.forecastDetails}>
                <div className={styles.temperature}>
                  <span>
                    <ArrowDown size={22} className={styles.icon} />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span>
                    <ArrowUp size={22} className={styles.icon} />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>

                <div className={styles.otherDetails}>
                  <span>
                    <Droplets className={styles.icon} />
                    <span>{day.humidity}%</span>
                  </span>
                  <span>
                    <Wind className={styles.icon} />
                    <span>{day.wind}m/s</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
