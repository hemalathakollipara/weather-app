import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import styles from "./HourlyTemperature.module.css";

export function HourlyTemperature({ forecast }) {
  const chartData = forecast.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <div className={styles.container}>
      <div>
        <h1 style={{ fontSize: "1.5rem", color: "var(--primary-color)" }}>
          Today's Temperature
        </h1>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <div style={{ height: "200px", width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div
                        style={{
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                          padding: "10px",
                          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                fontSize: "0.70rem",
                                textTransform: "uppercase",
                                color: "#888888",
                              }}
                            >
                              Temperature
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                              {payload[0].value}°
                            </span>
                          </div>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                fontSize: "0.70rem",
                                textTransform: "uppercase",
                                color: "#888888",
                              }}
                            >
                              Feels Like
                            </span>
                            <span style={{ fontWeight: "bold" }}>
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
