import React from 'react';
import './App.css'
import axios from "axios";
import info from "./info";
import { useEffect, useState } from 'react';
import WashLocations from './components/WashLocations';
import WashProducts from './components/WashProducts';
import Header from './components/Header';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

function App() {
  //useState with empty array
  const [locations, setLocations] = useState([])

  // initial api call and setting the info we get from the api into setLocations
  useEffect(() => {
    axios
      .get(info.backendUrl + "/locations")
      .then((response) => {
        setLocations(response.data.response.locations)
      })
  }, [])

  //mapping throug locations and returning each location and passing it into the Washlocation component
  const loca = locations.map((location) => {
    return ( <WashLocations key={location.id} location={location} /> )
  })

  //telling the browser which component belongs to the specific url
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={loca} />
        <Route path="/products/:lpn" element={<WashProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
