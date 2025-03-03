import { Text, Grid, GridItem } from '@chakra-ui/react';
import { WeatherData } from '../API';

// Define the props interface
interface WeatherProps extends WeatherData {}

function Weather({ feels_like, humidity, pressure, temp, weather, icon, city}: WeatherProps) {
    const icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`
    if (icon === undefined) return (<></>);
    return (
        // Display weather data
        // <div className="Todo">
        <Grid templateColumns="repeat(2, 1fr)" gap="4">
            <GridItem>
                <Text>Temperature: {temp ? Math.round(temp) : null}°C</Text>
            </GridItem>
            <GridItem>
                <Text>Feels like: {feels_like ? Math.round(feels_like) : null}°C</Text>
            </GridItem>
            <GridItem>
                <Text>Humidity: {humidity ? Math.round(humidity) : null}%</Text>
            </GridItem>
            <GridItem>
                <Text>Pressure: {pressure} hPa</Text>
            </GridItem>
            <GridItem colSpan={2}>
                <Text className='weather-icon-wrap'>{weather} {icon !== undefined ? <img src={icon_url} className='icon-img' alt="Weather icon"/> : null}</Text>
            </GridItem>
            <GridItem colSpan={2}>
                {city ? <Text>Weather in: {city}</Text> : null }
            </GridItem>
        </Grid>
    );
}

export default Weather;