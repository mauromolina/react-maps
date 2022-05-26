import { useContext, useState } from "react";
import { MapContext, PlacesContext } from "../context";
import { Feature } from "../interfaces/places.interfaces";
import { LoadingSearch } from "./";

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPointsAction } = useContext(MapContext);
  const [activeId, setActiveId] = useState("");

  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.center;
    setActiveId(place.id);
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  const getRoute = (place: Feature) => {
    if (!userLocation) return;
    const [lng, lat] = place.center
    getRouteBetweenPointsAction(userLocation, [lng, lat])
  }

  if (isLoadingPlaces) {
    return <LoadingSearch />;
  }

  if (places.length === 0) {
    return <></>;
  }

  return (
    <ul className="list-group mt-3">
      {places.map((place) => (
        <li
          className={`list-group-item list-group-item-action pointer ${
            activeId === place.id && "active"
          }`}
          key={place.id}
          onClick={() => onPlaceClick(place)}
        >
          <h6>{place.text_es}</h6>
          <p className={`${activeId === place.id && 'text-white'}`} style={{ fontSize: "12px" }}>
            {place.place_name}
          </p>
          <button
            className={`btn ${
              activeId === place.id
                ? "btn-outline-light"
                : "btn-outline-primary"
            } btn-sm`}
            onClick={() => getRoute(place)}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
