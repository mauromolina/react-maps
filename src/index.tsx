import React from 'react';
import ReactDOM from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import { MapsApp } from './MapsApp';

mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cm9tb2xpbmEiLCJhIjoiY2s2MTU5c3h6MDAxdzNmcG1jaTU0dWltciJ9.WW03bDo-OkvkcSuTR9pgTA';

if (!navigator.geolocation ) {
  alert('Tu navegador no tiene opción de Geolocalización')
  throw new Error('Tu navegador no tiene opción de Geolocalización');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp/>
  </React.StrictMode>
);
