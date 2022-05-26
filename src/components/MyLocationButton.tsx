import React, { useContext } from 'react'
import { MapContext, PlacesContext } from '../context'

export const MyLocationButton = () => {
    
    const { map } = useContext(MapContext)
    const { userLocation } = useContext(PlacesContext)
    
    const handleClick = () => {
        if ( !map ) throw new Error("El mapa todavía no se ha cargado.")
        if ( !userLocation ) throw new Error("No hay ubicación del usuario.")

        map.flyTo({
            center: userLocation
        })
    }
    
  return (
    <button className="btn btn-primary location-btn"
        onClick={handleClick}>
        Mi ubicación
    </button>
  )
}
