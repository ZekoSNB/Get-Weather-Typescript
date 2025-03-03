type GeoMetadata = {
    lat: number;
    lon: number;
}

export type WeatherData = {
    feelsLike: number | undefined;
    humidity: number | undefined;
    pressure: number | undefined;
    temp: number | undefined;
    weather: string | undefined;
    icon: string | undefined;
    city: string | undefined;
}



async function handle_geolocation_request(city: string, API_key: string, input_clear: Function): Promise<GeoMetadata[]> {
    if (city === '') {
        input_clear();
        return [] as GeoMetadata[];
    }
    try {
        const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_key}`;
        const data = await (await fetch(URL)).json();
        const result_data = data.map((geo: GeoMetadata) => ({
            lat: geo.lat,
            lon: geo.lon
        }))
        return result_data;
    }
    catch (error) {
        input_clear();
        return [] as GeoMetadata[];
    }
}

async function handle_weather_request(city: string, API_key: string, input_clear: Function, input_clear_plc: Function): Promise<WeatherData> {
    try {
        const data = await handle_geolocation_request(city, API_key, input_clear_plc);
        const weather_endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${API_key}&units=metric`;
        const weather_data = await (await fetch(weather_endpoint)).json();
        const weather_result: WeatherData = {
            feelsLike: weather_data.main.feelsLike,
            humidity: weather_data.main.humidity,
            pressure: weather_data.main.pressure,
            temp: weather_data.main.temp,
            weather: weather_data.weather[0].description,
            icon: weather_data.weather[0].icon,
            city: weather_data.name
        }
        input_clear();
        return weather_result;
    }
    catch (error) {
        input_clear_plc();
        alert("You put non existing city name or wrong name, check for typo ! :D");
        return {} as WeatherData;
    }
}

export default handle_weather_request;