import { useState } from "react";
import styles from "./Header.module.css";
import { Search } from "lucide-react";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Header() {
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    navigate({
      pathname: "/city",
      search: createSearchParams({
        city: cityName,
      }).toString(),
    });
  }

  return (
    <div className={styles.header}>
      <div>
        <h3>ClimataX</h3>
      </div>

      <div className={styles.searchContainer}>
        <Search size={20} />
        <input
          type="text"
          placeholder="Search cities..."
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>
    </div>
  );
}
