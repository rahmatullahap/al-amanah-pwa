import axios from "axios";

const API_KEY = "983fdd5ad118df88de9fae052e959590";
const CITY_ID = "1650357";
const URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async () => {
  const { data } = await axios.get(URL, {
    params: {
      id: CITY_ID,
      appid: API_KEY,
    },
  });

  return data;
};
