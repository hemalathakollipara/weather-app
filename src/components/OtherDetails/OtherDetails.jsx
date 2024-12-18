import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import { format } from "date-fns";
import styles from "./OtherDetails.module.css";

export default function OtherDetails({ weather }) {
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
