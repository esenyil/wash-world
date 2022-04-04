import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './WashProducts.css';
import info from "../info";
import axios from 'axios';

function WashProducts() {
    const [products, setProducts] = useState([])
    const [timer, setTimer] = useState(null)
    
    // timer state
    const [showTimer, setShowTimer] = useState(false)
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const [showTimeLeft, setShowTimeLeft] = useState(false)
    const [washFinish, setWashFinish] = useState("");
    const [showWashFinish, setShowWashFinish] = useState(false)

    //
    let { locationid, lpn } = useParams()
    let navigate = useNavigate()

    useEffect(() => {
        if(lpn){
            axios
            .get(info.backendUrl + `/products/${lpn}`)
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
                    setTimer('Ingen program')
                    setShowTimer(false)
                }
                else if(response.data.status === "success") {
                    setTimer(response.data.response.estimated_duration)
                }
                setShowTimer(true)
            })       
    }

    //Could have had this part in a separate component and the jsx
    function handleClickTimer(){
        const startingMinutes = parseInt(timer); //state timer
        let time = startingMinutes * 60;
        
        const startInterval = setInterval(() => { 
            const minutes = Math.floor(time / 60)
            let seconds = time % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds;
        
            setMin(minutes)
            setSec(seconds)
            time--;
            setShowTimeLeft(true)
            
            if(minutes <= 0 && seconds <= 0){
                clearInterval(startInterval)
                setWashFinish("Din vask er færdig!");
                setShowWashFinish(true)
            }
        }, 1000);
    }

    return(
        <>        
            {!showTimer && <div className="btn-wrapper">
                <button className="btn-tilbage" onClick={() => {navigate('/')}}>Tilbage</button>
            </div>}

            {!showTimer &&
            <div className="product-container">
                {products.map((product) => {
                    return(     
                        <div key={product.productid}>
                        <div className="product-wrapper" key={product.productid}>
                            <h2 className="product-name">{product.name}</h2>
                            {product.price == 0 ? <p>Premium medlem</p> : ''}
                            <p className="product-price">{product.price == 0 ? 'Gratis' : product.price}</p>
                            <p className="product-text">{product.description}</p>
                            <button onClick={() =>{handleClick(product.program)}}>Vælg</button>
                        </div>
                    </div>
                    )
                })}
            </div>}

            {showTimer && !showTimeLeft && (
            <div className="timer-container">
                <p className="timer-text">{timer === 'Ingen program' ? "Ingen program" : `Din vask varer: ${timer} min`}</p>
                {timer === 'Ingen program' ? '' : <button className={showTimeLeft ? "displaynone" : "btn-startwash"} onClick={handleClickTimer}>Start vask</button>}
            </div>
            )}

            {showTimer && showWashFinish && (
                <div className='timer-container'>
                    <p className="timer-text">{washFinish}</p>
                </div>  
            )}

            {showTimeLeft && !showWashFinish && (
                <div className='timer-container'>
                    <div className='timer'>{min}:{sec}</div>
                </div>
            )}

        </>
    )
};
export default WashProducts;