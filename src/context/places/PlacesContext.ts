import { createContext } from "react";
import { PlacesContextProps } from "../../interfaces/places.interfaces";

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);
