import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WashLocations.css';
import axios from "axios";
import info from "../info";

function WashLocations({ locations }) {

    // useNavigate navigates to another page
    let navigate = useNavigate()

    function handleClick(locationid) {
        console.log('location', locationid)
        axios
        .get(info.backendUrl + "/cam/" + locationid)
        .then((response) => {
            navigate(`/${locationid}/products/${response.data.response.lpn}`)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <>
            {locations.map((location) => {
                return(
                <div className="card-container" key={location.id}>
                    <div className="card-wrapper">
                        <h2 className="card-name">{location.name}</h2>
                        <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptatibus cupiditate atque vitae unde perspiciatis mollitia vero saepe nesciunt suscipit magni excepturi repellat accusamus, id at in ipsum fugit vel facilis similique praesentium? </p>       
                        <button disabled={location.status !== "available" ? "on" : ""} onClick={() => { handleClick(location.id)}}>Se vask</button>
                    </div>
                </div>
                )
            })}   
        </>
    )
};
export default WashLocations;