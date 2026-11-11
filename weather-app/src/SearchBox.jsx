import { useState } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';

export default function SearchBox({ updateInfo, unit, toggleUnit }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(false);

  // Free API (No Key Required)
  const getWeatherInfo = async (cityName) => {
    try {
      const response = await fetch(
        `https://wttr.in/${encodeURIComponent(cityName)}?format=j1`
      );
      if (!response.ok) throw new Error('Network error');

      const data = await response.json();
      const current = data.current_condition[0];
      const area = data.nearest_area[0];
      const weatherObj = data.weather[0];

      return {
        city: area.areaName[0].value,
        temp: Math.round(Number(current.temp_C)),
        tempMin: Math.round(Number(weatherObj.mintempC)),
        tempMax: Math.round(Number(weatherObj.maxtempC)),
        humidity: Number(current.humidity),
        feelsLike: Math.round(Number(current.FeelsLikeC)),
        weather: current.weatherDesc[0].value,
        description: current.weatherDesc[0].value,
        windSpeed: (Number(current.windspeedKmph) / 3.6).toFixed(1), // Kmph to m/s
        pressure: Number(current.pressure),
        country: area.country[0].value,
      };
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!city.trim()) return;

    try {
      setError(false);
      let newInfo = await getWeatherInfo(city.trim());
      updateInfo(newInfo);
      setCity('');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Box sx={{ width: '100%', marginTop: '24px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '4px 16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', marginRight: '8px' }} />
          <InputBase
            placeholder="Search City (e.g. Mumbai, London, Tokyo)..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            sx={{
              color: '#fff',
              width: '100%',
              fontSize: '14px',
              '& input::placeholder': { color: 'rgba(255, 255, 255, 0.6)' },
            }}
          />
          <IconButton type="submit" sx={{ color: '#fff' }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Chip
          label={`°${unit}`}
          onClick={toggleUnit}
          clickable
          sx={{
            height: '46px',
            paddingX: '8px',
            borderRadius: '14px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
          }}
        />
      </form>

      {error && (
        <Alert severity="error" sx={{ marginTop: '12px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.4)', color: '#fff' }}>
          City not found! Please check spelling and try again.
        </Alert>
      )}
    </Box>
  );
}