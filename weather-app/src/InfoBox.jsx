import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import GrainIcon from '@mui/icons-material/Grain';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function InfoBox({ info, unit }) {
  const convertTemp = (tempC) => {
    if (unit === 'F') return Math.round((tempC * 9) / 5 + 32);
    return tempC;
  };

  const getWeatherIcon = () => {
    const main = (info.weather || '').toLowerCase();
    if (main.includes('rain')) return <GrainIcon sx={{ fontSize: 58, color: '#60a5fa' }} />;
    if (main.includes('cloud') || main.includes('haze') || main.includes('mist') || main.includes('fog'))
      return <CloudIcon sx={{ fontSize: 58, color: '#e2e8f0' }} />;
    if (main.includes('thunder')) return <ThunderstormIcon sx={{ fontSize: 58, color: '#fbbf24' }} />;
    return <WbSunnyIcon sx={{ fontSize: 58, color: '#fbbf24' }} />;
  };

  const metricBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(10px)',
    padding: '16px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.25)',
    },
  };

  return (
    <Grid container spacing={4} alignItems="center">
      {/* Left Column: Location & Main Temperature */}
      <Grid item xs={12} md={6}>
        <Box sx={{ paddingRight: { md: '12px' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', marginBottom: '6px' }}>
            <LocationOnIcon sx={{ fontSize: 18 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {info.country || 'IN'}
            </Typography>
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
            {info.city}
          </Typography>

          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.75)', textTransform: 'capitalize', fontWeight: 500, marginTop: '2px' }}>
            {info.description || info.weather}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginY: '20px' }}>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Soft Ambient Glow Behind Weather Icon */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '60px',
                  height: '60px',
                  background: '#38bdf8',
                  filter: 'blur(30px)',
                  opacity: 0.5,
                  borderRadius: '50%',
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1 }}>{getWeatherIcon()}</Box>
            </Box>

            <Typography variant="h1" sx={{ fontWeight: 800, fontSize: '4.8rem', lineHeight: 1, letterSpacing: '-1px' }}>
              {convertTemp(info.temp)}&deg;{unit}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.55)', fontWeight: 500 }}>
            Min: {convertTemp(info.tempMin)}&deg;{unit} &bull; Max: {convertTemp(info.tempMax)}&deg;{unit}
          </Typography>
        </Box>
      </Grid>

      {/* Right Column: 2x2 Clean Metric Grid */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={metricBoxStyle}>
              <DeviceThermostatIcon sx={{ color: '#f87171', fontSize: 22, marginBottom: '6px' }} />
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                Feels Like
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                {convertTemp(info.feelsLike)}&deg;{unit}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={metricBoxStyle}>
              <WaterDropIcon sx={{ color: '#38bdf8', fontSize: 22, marginBottom: '6px' }} />
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                Humidity
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                {info.humidity}%
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={metricBoxStyle}>
              <AirIcon sx={{ color: '#4ade80', fontSize: 22, marginBottom: '6px' }} />
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                Wind Speed
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                {info.windSpeed} m/s
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={metricBoxStyle}>
              <CompressIcon sx={{ color: '#c084fc', fontSize: 22, marginBottom: '6px' }} />
              <Typography variant="caption" sx={{ display: 'block', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
                Pressure
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                {info.pressure} hPa
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}