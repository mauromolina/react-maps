import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { useContext, useEffect, useReducer } from "react";
import { directionsApi } from "../../apis";
import { DirectionResponse } from "../../interfaces/directions.interfaces";
import { MapContextProps, MapState } from "../../interfaces/map.interfaces";
import { PlacesContext } from "../places/PlacesContext";
import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [mapState, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  const setMapAction = (map: Map) => {
    const locationPopup = new Popup().setHTML(`Este es un Popup`);
    new Marker().setLngLat(map.getCenter()).setPopup(locationPopup).addTo(map);
    dispatch({
      type: "setMap",
      payload: map,
    });
  };

  useEffect(() => {
    mapState.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];
    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p${place.place_name_es}></p>
        `);
      const marker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo(mapState.map!);
      newMarkers.push(marker);
      //TODO: Limpiar polyline
    }
    dispatch({
      type: "setMarkers",
      payload: newMarkers,
    });
  }, [places]);

  const getRouteBetweenPointsAction = async (
    start: [number, number],
    end: [number, number]
  ) => {
    const resp = await directionsApi.get<DirectionResponse>(
      `/${start.join(",")};${end.join(",")}`);
    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry;
    let kms = distance / 1000;
        kms = Math.round(kms*100);
        kms /= 100;
    const minutes = Math.floor(duration/60);
    console.log({kms, minutes});

    const bounds = new LngLatBounds(
      start,
      start
    )

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord)
    }

    mapState.map?.fitBounds(bounds, {padding: 200});
    
    const srcData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if (mapState.map?.getLayer('RouteString')) {
      mapState.map.removeLayer('RouteString')
      mapState.map.removeSource('RouteString')
    }

    mapState.map?.addSource('RouteString', srcData);
    mapState.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'blue',
        'line-width': 3
      }
    })

  };

  const mapProvider: MapContextProps = {
    ...mapState,
    setMapAction,
    getRouteBetweenPointsAction,
  };

  return (
    <MapContext.Provider value={mapProvider}>{children}</MapContext.Provider>
  );
};
