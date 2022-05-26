import { Map, Marker } from "mapbox-gl";

export interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
  setMapAction: (map: Map) => void;
  getRouteBetweenPointsAction: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}
