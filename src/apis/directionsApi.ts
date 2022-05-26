import axios from "axios";

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: 'pk.eyJ1IjoibWF1cm9tb2xpbmEiLCJhIjoiY2s2MTU5c3h6MDAxdzNmcG1jaTU0dWltciJ9.WW03bDo-OkvkcSuTR9pgTA'
    }
})

export default directionsApi;