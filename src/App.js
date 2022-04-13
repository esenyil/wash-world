import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import axios from "axios";
import info from "./info";

//pages
import WashLocations from "./components/WashLocations";
import WashProducts from "./components/WashProducts";
import Header from "./components/Header";

function App() {
  //useState with empty array
  const [locations, setLocations] = useState([]);

  // initial api call and setting the location info we get from the api into setLocations
  useEffect(() => {
    axios
      .get(info.backendUrl + "/locations")
      .then((response) => {
        setLocations(response.data.response.locations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //telling the browser which component belongs to the specific url
  return (
    <BrowserRouter basename="/wash-world/">
      <Header />
      <Routes>
        <Route path="/" element={<WashLocations locations={locations} />} />
        <Route path="/:locationid/products/:lpn" element={<WashProducts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
