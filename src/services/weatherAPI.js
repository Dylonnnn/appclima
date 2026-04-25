const API_KEY = 'af742787e2f01c8661e88e4cbbd8a2b1';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (ciudad) => {
  const res = await fetch(
    `${BASE_URL}/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`
  );
  const data = await res.json();
  if (data.cod !== 200) throw new Error('Ciudad no encontrada');
  return data;
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
  );
  const data = await res.json();
  if (data.cod !== 200) throw new Error('No se pudo obtener el clima');
  return data;
};