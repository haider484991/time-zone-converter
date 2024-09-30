"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import moment from 'moment-timezone';

interface Weather {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface CityData {
  name: string;
  timezone: string;
  lat: number;
  lon: number;
}

const trendingCities: CityData[] = [
  { name: 'London', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' },

];

const API_KEY = '81c4d83c8af8a53362468546fa7a4ebe';

const WorldClock = () => {
  const [weatherData, setWeatherData] = useState<{ [key: string]: Weather }>({});
  const [error, setError] = useState<string | null>(null);
  const [fromTimezone, setFromTimezone] = useState<string>('');
  const [toTimezone, setToTimezone] = useState<string>('');
  const [userTime, setUserTime] = useState<string>('');
  const [convertedTime, setConvertedTime] = useState<string | null>(null);
  const [convertedDate, setConvertedDate] = useState<string | null>(null);
  const [convertedDay, setConvertedDay] = useState<string | null>(null);
  const [timezoneSuggestions, setTimezoneSuggestions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch weather data
  const fetchWeather = async () => {
    try {
      const weatherPromises = trendingCities.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`)
      );

      const weatherResponses = await Promise.all(weatherPromises);
      const weatherInfo = weatherResponses.reduce((acc, response, index) => {
        acc[trendingCities[index].name] = response.data;
        return acc;
      }, {} as { [key: string]: Weather });

      setWeatherData(weatherInfo);
    } catch (error) {
      setError('Error fetching weather data. Please try again later.');
      console.error('Error fetching weather data:', error);
    }
  };

  const updateTime = () => {
    trendingCities.forEach((city) => {
      const now = moment.tz(city.timezone);
      const daySelector = `.clock-day.${city.name.replace(/,/g, '_')}`;
      const hoursSelector = `.clock-hours.${city.name.replace(/,/g, '_')}`;
      const minutesSelector = `.clock-minutes.${city.name.replace(/,/g, '_')}`;
      const secondsSelector = `.clock-seconds.${city.name.replace(/,/g, '_')}`;
      
      const dayElement = document.querySelector(daySelector);
      const hoursElement = document.querySelector(hoursSelector);
      const minutesElement = document.querySelector(minutesSelector);
      const secondsElement = document.querySelector(secondsSelector);
  
      if (dayElement) dayElement.textContent = now.format('ddd');
      if (hoursElement) hoursElement.textContent = now.format('HH');
      if (minutesElement) minutesElement.textContent = now.format('mm');
      if (secondsElement) secondsElement.textContent = now.format('ss');
    });
  };

  const [fromTimezoneSuggestions, setFromTimezoneSuggestions] = useState<string[]>([]);
const [toTimezoneSuggestions, setToTimezoneSuggestions] = useState<string[]>([]);

const handleTimezoneChange = (e: React.ChangeEvent<HTMLInputElement>, isFromTimezone: boolean) => {
    const value = e.target.value;
    
    if (isFromTimezone) {
        setFromTimezone(value);

        // Set suggestions only for 'From' input
        const suggestions = moment.tz.names().filter(tz => tz.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
        setFromTimezoneSuggestions(suggestions);
        setToTimezoneSuggestions([]); // Clear 'To' input suggestions
    } else {
        setToTimezone(value);

        // Set suggestions only for 'To' input
        const suggestions = moment.tz.names().filter(tz => tz.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
        setToTimezoneSuggestions(suggestions);
        setFromTimezoneSuggestions([]); // Clear 'From' input suggestions
    }
};

const handleSuggestionClick = (suggestion: string, isFromTimezone: boolean) => {
    if (isFromTimezone) {
        setFromTimezone(suggestion);
        setFromTimezoneSuggestions([]); // Clear suggestions after selection
    } else {
        setToTimezone(suggestion);
        setToTimezoneSuggestions([]); // Clear suggestions after selection
    }
};

  const handleUserTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserTime(e.target.value);
  };

  const convertTime = () => {
    setErrorMessage(null); // Reset error message

    if (!fromTimezone || !toTimezone || !userTime) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    const userMoment = moment.tz(userTime, fromTimezone);
    const convertedMoment = userMoment.tz(toTimezone);
    const formattedTime = convertedMoment.format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = convertedMoment.format('YYYY-MM-DD');
    const formattedDay = convertedMoment.format('dddd');

    setConvertedTime(formattedTime);
    setConvertedDate(formattedDate);
    setConvertedDay(formattedDay);
  };

  // Fetch weather on mount
  useEffect(() => {
    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 3600000);
    return () => clearInterval(weatherInterval);
  }, []);

  // Update time every second
  useEffect(() => {
    updateTime(); // Initial call to set the time
    const timeInterval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <div className="flex flex-col items-center p-4 bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen">
      <h2 className="text-4xl font-bold text-white mb-4">🌍 Timezone Converter</h2>

      <div className="timezone-converter mt-8 p-4 bg-gray-700 shadow-md rounded-lg w-full max-w-4xl">
        <h3 className="text-2xl font-semibold mb-2 text-white">🕒 Convert Time</h3>

        <div>
    {/* From Timezone Input */}
    <div className="mb-2 relative">
      <input
        type="text"
        placeholder="From Timezone..."
        className="border border-gray-500 rounded p-3 w-full bg-gray-800 text-white"
        value={fromTimezone}
        onChange={(e) => handleTimezoneChange(e, true)}
      />
      {fromTimezoneSuggestions.length > 0 && (
        <ul className="suggestions-list bg-gray-700 border border-gray-600 rounded shadow-md max-h-40 overflow-y-auto absolute z-10 w-full">
          {fromTimezoneSuggestions.map((tz, index) => (
            <li
              key={index}
              className="suggestion-item p-2 hover:bg-blue-500 cursor-pointer text-white"
              onClick={() => handleSuggestionClick(tz, true)}
            >
              {tz}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* To Timezone Input */}
    <div className="mb-2 relative">
      <input
        type="text"
        placeholder="To Timezone..."
        className="border border-gray-500 rounded p-3 w-full bg-gray-800 text-white"
        value={toTimezone}
        onChange={(e) => handleTimezoneChange(e, false)}
      />
      {toTimezoneSuggestions.length > 0 && (
        <ul className="suggestions-list bg-gray-700 border border-gray-600 rounded shadow-md max-h-40 overflow-y-auto absolute z-10 w-full">
          {toTimezoneSuggestions.map((tz, index) => (
            <li
              key={index}
              className="suggestion-item p-2 hover:bg-blue-500 cursor-pointer text-white"
              onClick={() => handleSuggestionClick(tz, false)}
            >
              {tz}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>

        <input
          type="datetime-local"
          className="border border-gray-500 rounded p-3 mb-2 w-full bg-gray-800 text-white"
          value={userTime}
          onChange={handleUserTimeChange}
        />
        
        <button
          className="bg-blue-500 text-white rounded p-3 w-full"
          onClick={convertTime}
        >
          Convert Time
        </button>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {convertedTime && (
         <div className="mt-4 p-4 bg-gray-600 shadow-md rounded-lg text-white text-center">
         <div className="converted-time-card">
           <p className="text-3xl font-bold">Converted Time: </p>
           <p className="converted-timer text-5xl">{new Date(convertedTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
         </div>
         <div className="converted-date-card mt-4">
           <p className="text-2xl font-bold">Converted Date:</p>
           <p className="converted-date text-4xl">{convertedDate}</p>
         </div>
         <div className="converted-day-card mt-4">
           <p className="text-2xl font-bold">Day:</p>
           <p className="converted-day text-4xl">{convertedDay}</p>
         </div>
       </div>
        )}
      </div>

      <h2 className="text-4xl font-bold text-white mt-8">🕰️ World Clocks</h2>
      <div className="flex flex-wrap justify-center mt-4">
        {trendingCities.map(city => (
          <div key={city.name} className="clock-col flex flex-col items-center m-4 text-white">
            <h3 className="text-xl">{city.name}</h3>
            <p className={`clock-hours clock-timer ${city.name.replace(/,/g, '_')}`}></p>
            <p className="clock-label">Hours</p>
            <p className={`clock-minutes clock-timer ${city.name.replace(/,/g, '_')}`}></p>
            <p className="clock-label">Minutes</p>
            <p className={`clock-seconds clock-timer ${city.name.replace(/,/g, '_')}`}></p>
            <p className="clock-label">Seconds</p>
            {weatherData[city.name] && (
              <div className="weather-info">
                <p>Temperature: {weatherData[city.name].main.temp}°C</p>
                <p>Description: {weatherData[city.name].weather[0].description}</p>
                <Image
                  src={`https://openweathermap.org/img/wn/${weatherData[city.name].weather[0].icon}@2x.png`}
                  alt={weatherData[city.name].weather[0].description}
                  width={50}
                  height={50}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
