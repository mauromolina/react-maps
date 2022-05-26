import React from 'react'
import { MapView, MyLocationButton, SearchBar } from '../components'

export const Home = () => {
  return (
    <>
      <MapView/>
      <SearchBar/>
      <MyLocationButton/>
    </>
  )
}
