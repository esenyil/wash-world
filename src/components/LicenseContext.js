import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import info from "../info";
import WashLocations from "./WashLocations";

const LicenseContext = createContext();
const LocationContext = createContext();

export function useLicense() {
    return useContext(LicenseContext)
}

export function useLocations() {
    return useContext(LocationContext)
}

export function LicenseProvider({ children }) {
    const [license, setLicense] = useState([])
    const [locations, setLocations] = useState([])

    useEffect(() => {  
        axios
        .get(info.backendUrl + "/cam/" + locations.id)
        .then((response) => {
            setLicense(response.data.response.lpn)
        })
    }, [])

    useEffect(() => {
        axios
            .get(info.backendUrl + "/locations")
            .then((response) => {
            setLocations(response.data.response.locations)
            })
    }, [])
      


    return(
        <LicenseContext.Provider value={license}>
                <LocationContext value={locations}>
                    {children}
                </LocationContext>
        </LicenseContext.Provider>
    )
}