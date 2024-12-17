const BASE_URL = "https://api.openweathermap.org";

export async function getGeoInfo(cityName) {
  const endpoint = `${BASE_URL}/geo/1.0/direct?q=${cityName}&appid=${
    import.meta.env.VITE_API_KEY
  }`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}

export async function getWeather(lat, lon) {
  const endpoint = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
    import.meta.env.VITE_API_KEY
  }&units=metric`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
}
