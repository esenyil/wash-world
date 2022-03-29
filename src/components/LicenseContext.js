import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import info from "../info";
import WashLocations from "./WashLocations";

const LicenseContext = createContext();
const LicenseLocationClicked = createContext();
const LocationContext = createContext();

export function useLicense() {
    return useContext(LicenseContext)
}

export function useLicenseClick() {
    return useContext(LicenseLocationClicked)
}

export function useLocations() {
    return useContext(LocationContext)
}

export function LicenseProvider({ children }) {
    const [license, setLicense] = useState([])
    const [locations, setLocations] = useState([])

    function locationClicked() {   
        axios
        .get(info.backendUrl + "/cam/" + locations.id)
        .then((response) => {
            setLicense(response.data.response.lpn)
        })
    }

    useEffect(() => {
        axios
            .get(info.backendUrl + "/locations")
            .then((response) => {
            setLocations(response.data.response.locations)
            })
        }, [])
      


    return(
        <LicenseContext.Provider value={license}>
            <LicenseLocationClicked value={locationClicked}>
                <LocationContext value={locations}>
                    {children}
                </LocationContext>
            </LicenseLocationClicked>
        </LicenseContext.Provider>
    )
}