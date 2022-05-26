import { Map } from "mapbox-gl";
import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMapAction } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current!,
        style: "mapbox://styles/mapbox/streets-v11",
        center: userLocation,
        zoom: 14,
      });
      setMapAction(map);
    }
  }, [ isLoading ]);

  return isLoading ? (
    <Loading />
  ) : (
    <div ref={mapDiv} className="map-container">
      {userLocation?.join(",")}
    </div>
  );
};
