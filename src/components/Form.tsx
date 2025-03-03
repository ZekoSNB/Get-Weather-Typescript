import React from 'react'
import { useState } from 'react';
import handle_weather_request from '../API';
import Weather from './Weather';
import { WeatherData } from '../API';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/form-control'
import {
    Button
} from '@chakra-ui/react';

function Form() {
    const [value, setValue] = useState('');
    const [placeholder, setPlaceholder] = useState('Zadaj Mesto');
    const [weather_props, setWeatherProps] = useState<WeatherData>();
   
    const button_styles = {
        background: "#8758ff",
        color: "#fff",
        border: "none",
        padding: "0.55rem",
        cursor: "pointer",
    }
    
    const clearInput_plc = () => {
        clearInput();
        setPlaceholder('Zadaj Mesto');
    }

    const clearInput = () => {
        setValue('');
        weather_props && setWeatherProps(undefined);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setPlaceholder(event.target.value);
    }
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const weather_props = handle_weather_request(value, '4bcad25ef0235a2c44a12fcd064f4a15', clearInput, clearInput_plc);
        setWeatherProps(await weather_props);
    }

    const isError = value === '';

    return (
        <>  
            <form onSubmit={handleSubmit}>
                <FormControl className='TodoForm' isInvalid={isError} isRequired>
                    <input className='todo-input' placeholder={placeholder} type="text" value={value} onChange={handleInputChange}/>
                    <Button type="submit" rounded="0" css={button_styles} h='42px' mt="-1px">Get Weather</Button>
                    {isError ? (
                        <FormErrorMessage w="100%" textAlign="center">City name is required</FormErrorMessage>
                    ) : (
                        null
                    )}
                </FormControl>
            </form>
            <Button w="100%" mb="1rem" mt="0.1rem" css={button_styles} onClick={clearInput_plc}>Clear Input</Button>
            <Weather city={weather_props?.city} icon={weather_props?.icon} weather={weather_props?.weather} feels_like={weather_props?.feels_like} humidity={weather_props?.humidity} temp={weather_props?.temp} pressure={weather_props?.pressure}/>
        </>
    )
}

export default Form
