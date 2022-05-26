import axios from "axios";

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1IjoibWF1cm9tb2xpbmEiLCJhIjoiY2s2MTU5c3h6MDAxdzNmcG1jaTU0dWltciJ9.WW03bDo-OkvkcSuTR9pgTA'
    }
})

export default searchApi;