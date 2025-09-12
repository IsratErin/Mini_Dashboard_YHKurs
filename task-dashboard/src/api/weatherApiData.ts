const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

interface WeatherData {
    main: {
        temp: number;
    }
}
const fetchCityWeatherData = (city: string): Promise<number> => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    return fetch(url)
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error('The response from network was not ok');
            }else{
                return response.json();
            }    
        })
        .then((data: WeatherData) => {
            console.log(`Temperature in ${city} is ${data.main.temp}°C`);
            return data.main.temp;
        })
        .catch((error) => {
            console.error('There has been a problem while fetching weather data', error);
            throw error;
        }); 
}

export { fetchCityWeatherData };