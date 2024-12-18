import { useState } from "react";
import styles from "./Header.module.css";
import { Search } from "lucide-react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [cityName, setCityName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isMyCityPage = location.pathname === "/my-city";

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

      {isMyCityPage ? (
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
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
      ) : (
        <button
          className={styles.backButton}
          onClick={() => navigate("/my-city")}
        >
          Back
        </button>
      )}
    </div>
  );
}
