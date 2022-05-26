import React, { ChangeEvent, useContext, useRef } from "react";
import { PlacesContext } from "../context";
import { SearchResults } from "./SearchResults";

export const SearchBar = () => {
  const { searchPlacesByAction } = useContext(PlacesContext);

  const debounceRef = useRef<NodeJS.Timeout>();

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      searchPlacesByAction(e.target.value);
    }, 1000);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar en React Maps"
        onChange={onQueryChange}
      />
      <SearchResults/>
    </div>
  );
};
