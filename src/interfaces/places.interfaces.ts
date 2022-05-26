export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number],
    isLoadingPlaces: boolean;
    places: Feature[]
    searchPlacesByAction: (query: string) => Promise<Feature[]>
}

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number],
    isLoadingPlaces: boolean;
    places: Feature[]
}

export interface PlacesResponse {
    type:        string;
    query:       number[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          string;
    place_type:    string[];
    relevance:     number;
    properties:    Properties;
    text_es:       string;
    place_name_es: string;
    text:          string;
    place_name:    string;
    bbox:          number[];
    center:        number[];
    geometry:      Geometry;
    context:       Context[];
}

export interface Context {
    id:          string;
    wikidata:    string;
    text_es:     string;
    language_es: string;
    text:        string;
    language:    string;
    short_code?: string;
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
}
