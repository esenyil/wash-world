import info from "../info";
import './WashProducts.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MyContext from '../App';

function WashProducts({item}) {
    const [products, setProducts] = useState([])
    let { lpn } = useParams()
    let navigate = useNavigate()
    // const license = useContext(MyContext)

    useEffect(() => {
        axios
          .get(info.backendUrl + `/products/:${lpn}`)
          .then((response) => {
              //console.log(response)
            setProducts(response.data.response.products)
          })
    }, [])

    function handleClick() {
        navigate('/')
    }

    return(
        <div className="card-container">
            <button onClick={handleClick}>Tilbage</button>
            {products.map((product) => {
                return(     
                    <div key={product.productid}>
                    <div className="card-wrapper" key={product.productid}>
                        <h2 className="card-name">{product.name}</h2>
                        <p className="product-price">{product.price}</p>
                        <p className="card-text">{product.description}</p>
                        <p>{product.program}</p>
                    </div>
                    {lpn}
                </div>
                )
            })}
        </div>
    )
};
export default WashProducts;