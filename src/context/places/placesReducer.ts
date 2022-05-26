import { Feature, PlacesState } from "../../interfaces/places.interfaces";

type PlacesAction =
  | { type: "setUserLocation"; payload: [number, number] }
  | { type: "setLoadingPlaces" }
  | { type: "setPlaces"; payload: Feature[] }
  | { type: "removePlaces" };

export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case "setLoadingPlaces":
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };
    case "setPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      }
      case "removePlaces":
          return {
              ...state,
              places: state.places
          }
    default:
      return state;
  }
};
