import React, { useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    setLoading(true); setError(''); setWeather(null);
    try {
      const { data } = await axios.get(`${API}/weather/${city}`);
      data.cod !== 200 ? setError(data.message) : setWeather(data);
    } catch {
      setError('Could not fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{maxWidth:460,margin:'60px auto',fontFamily:'sans-serif',textAlign:'center',padding:'0 16px'}}>
      <h1>🌤 Weather Dashboard</h1>
      <form onSubmit={search} style={{display:'flex',gap:8,marginBottom:24}}>
        <input
          style={{flex:1,padding:'10px 14px',fontSize:16,borderRadius:6,border:'1px solid #ccc'}}
          placeholder="Enter city..."
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button
          style={{padding:'10px 20px',fontSize:16,borderRadius:6,border:'none',background:'#0078d4',color:'#fff',cursor:'pointer'}}
          disabled={loading}
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {weather && (
        <div style={{background:'#f0f4ff',borderRadius:12,padding:24,boxShadow:'0 2px 8px rgba(0,0,0,0.1)'}}>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p style={{fontSize:48,fontWeight:'bold',margin:'8px 0'}}>{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <div style={{display:'flex',justifyContent:'space-around',marginTop:16,color:'#555'}}>
            <span>💧 {weather.main.humidity}%</span>
            <span>💨 {weather.wind.speed} m/s</span>
            <span>🌡 Feels {Math.round(weather.main.feels_like)}°C</span>
          </div>
        </div>
      )}
    </div>
  );
}
