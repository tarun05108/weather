import { useState } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import Box from '@mui/material/Box';

export default function WeatherApp() {
  const [unit, setUnit] = useState('C');
  const [weatherInfo, setWeatherInfo] = useState({
    city: 'Chennai',
    feelsLike: 28,
    temp: 26,
    tempMin: 24,
    tempMax: 29,
    humidity: 67,
    weather: 'Clouds',
    description: 'Partly Sunny',
    windSpeed: 3.5,
    pressure: 1012,
    country: 'IN',
  });

  const updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundImage: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 41, 59, 0.8) 100%), url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Frosted Glass Floating Dashboard Card */}
      <Box
        sx={{
          maxWidth: '780px',
          width: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: { xs: '24px', md: '36px' },
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <InfoBox info={weatherInfo} unit={unit} />
        <SearchBox updateInfo={updateInfo} unit={unit} toggleUnit={toggleUnit} />
      </Box>
    </Box>
  );
}