import axios from "axios";
import info from "../info";
import './WashLocations.css';
import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import LicenseContext from '../App';
import SetLicenseContext from '../App';
import WashProducts from "./WashProducts";


function WashLocations({ location }) {
    // const license = useContext(LicenseContext)
    // const setLicense = useContext(SetLicenseContext)
    const [license, setLicense] = useState([])

    // useNavigate navigates to another page
    let navigate = useNavigate()
    let { lpn } = useParams()

    useEffect(() => {
        axios
        .get(info.backendUrl + "/cam/" + location.id)
        .then((response) => {
                setLicense(response.data.response.lpn)            
        })
    }, [])
    
    // function locationClicked() {      

    // }

    console.log(license)

    function handleClick() {
        navigate(`/products/${license}`)
    }

    return(
        <div className="card-container">
            {/* {license.map((item) => {
                return ( <WashProducts key={item} item={item} /> )
            })} */}
            <div className="card-wrapper" key={location.id} location={location}>
                <h2 className="card-name">{location.name}</h2>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum voluptatibus cupiditate atque vitae unde perspiciatis mollitia vero saepe nesciunt suscipit magni excepturi repellat accusamus, id at in ipsum fugit vel facilis similique praesentium? </p>

                {/* <Link to={`/products/:${lpn}`} ><button>vask</button></Link> */}
                
                <button disabled={location.status !== "available" ? "on" : ""} onClick={() => { handleClick();}}>Se vask</button>
            </div>
        </div>
    )
};
export default WashLocations;