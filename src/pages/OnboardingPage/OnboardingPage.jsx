import React, { useState } from "react";
import styles from "./OnboardingPage.module.css";
import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("city-name", cityName);
    navigate("/my-city");
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div>
          <div className={styles.header}>
            <h1>ClimataX.</h1>
          </div>

          <div className={styles.content}>
            <h1>
              Weather &<br /> forecast <br /> application
            </h1>
            <p>
              Use climatax to get weather information daily. Please provide your
              city name to get weather information.
            </p>
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter city name"
                value={cityName}
                onChange={(e) => {
                  setCityName(e.target.value);
                }}
              />
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.imageContainer}>
        <img src="/weather-header.png" />
      </div>
    </div>
  );
}
