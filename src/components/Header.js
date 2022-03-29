import React from 'react';
import './Header.css';
import Logo from '../img/WW-logo-sort-tekst.svg';
import { Link } from 'react-router-dom';

function Header() {
    return(
        <div className="header-container">
            <Link to={'/'}><img src={Logo} alt="" className='logo' /></Link>
        </div>
    )
}
export default Header;