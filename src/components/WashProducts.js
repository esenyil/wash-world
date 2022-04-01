import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WashProducts.css';
import info from "../info";
import axios from 'axios';


function WashProducts() {
    const [products, setProducts] = useState([])
    const [timer, setTimer] = useState(null)
    const [showTimer, setShowTimer] = useState(false)
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)

    let { locationid, lpn } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        console.log('lpn', lpn)
        if(lpn){
            axios
            .get(info.backendUrl + `/products/:${lpn}`)
            .then((response) => {
              setProducts(response.data.response.products)
            })
        }
    }, [lpn])

    function handleClick(productprogram) {  
            axios
            .post(info.backendUrl + '/' + locationid + '/start/' + productprogram)
            .then((response) => {
                console.log(response.data)
                console.log(response.data.status)
                if(response.data.status === undefined) {
                    setTimer('No program')
                }
                else if(response.data.status === "success") {
                    setTimer(response.data.response.estimated_duration)
                }
                setShowTimer(true)
            })       
    }

    useEffect(() =>{
        const startingMinutes = parseInt(timer); //state timer
        console.log(timer)
        let time = startingMinutes * 60;
        
        const startInterval = setInterval(() => {
            const minutes = Math.floor(time / 60)
            let seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
        
            setMin(minutes)
            setSec(seconds)    
            time--;
            
            if(minutes <= 0 && seconds <= 0){
                clearInterval(startInterval)
            }
        }, 1000);
    },[])

    function handleClickBack() {
        navigate('/')
    }

    return(
        <>        
            {!showTimer && <div className="btn-wrapper">
                <button className="btn-tilbage" onClick={handleClickBack}>Tilbage</button>
            </div>}

            {!showTimer &&
            <div className="product-container">
                {products.map((product) => {
                    return(     
                        <div key={product.productid}>
                        <div className="product-wrapper" key={product.productid}>
                            <h2 className="product-name">{product.name}</h2>
                            <p className="product-price">{product.price}</p>
                            <p className="product-text">{product.description}</p>
                            <button onClick={() => {handleClick(product.program)}}>Vælg</button>
                        </div>
                    </div>
                    )
                })}
            </div>}

            {showTimer && 
                <div className='timer-container'>
                    <button></button>
                <p className='timer' >{min}:{sec}</p>
            </div>}
        </>
    )
};
export default WashProducts;