import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis";
import { getUserLocation } from "../../helpers";
import {
  PlacesContextProps,
  PlacesResponse,
  PlacesState,
} from "../../interfaces/places.interfaces";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [placesState, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  const searchPlacesByAction = async (query: string) => {
    if (query.length === 0) dispatch({ type: "removePlaces" });
    if (!placesState.userLocation)
      throw new Error("No hay ubicación del usuario");
    dispatch({ type: "setLoadingPlaces" });
    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: placesState.userLocation.join(","),
      },
    });
    dispatch({
      type: "setPlaces",
      payload: resp.data.features,
    });
    return resp.data.features;
  };

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({
        type: "setUserLocation",
        payload: lngLat,
      })
    );
  }, []);

  const placesProvider: PlacesContextProps = {
    ...placesState,
    searchPlacesByAction,
  };

  return (
    <PlacesContext.Provider value={placesProvider}>
      {children}
    </PlacesContext.Provider>
  );
};
