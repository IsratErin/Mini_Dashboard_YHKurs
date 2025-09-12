const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
}

const getCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by the browser'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

const fetchCurrentLocationWeather = (): Promise<{
  temp: number;
  city: string;
}> => {
  return getCurrentLocation()
    .then(({ lat, lon }) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      return fetch(url);
    })
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error('The response from network was not ok');
      }
      return response.json();
    })
    .then((data: WeatherData) => {
      console.log(`Temperature in ${data.name} is ${data.main.temp}°C`);
      return { temp: data.main.temp, city: data.name };
    })
    .catch((error) => {
      console.error(
        'There has been a problem while fetching weather data',
        error
      );
      throw error;
    });
};

export { fetchCurrentLocationWeather };
