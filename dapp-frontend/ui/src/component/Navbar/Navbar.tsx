import React from 'react';
import './Navbar.css';
import {NavLink} from "react-router-dom";
import web from "./logos.png";

const Navbar =() =>{
    return(
        <>
            <div className="container-fluid">
                <div className='row'>
                    <div className="col-12 mx-auto">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <NavLink to="" className="navbar-brand">
                            <img src={web} alt='...' />
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item ">
                        <NavLink to="/" className="nav-link active" aria-current="page" >Home 
                        </NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/Allsurvey" className="nav-link">All survey</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/Mysurvey" className="nav-link" href="#">My survey</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/Connectwallet" className="nav-link" href="#">Connect wallet</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/Help"className="nav-link" href="#">Help</NavLink>
                        </li>
      
                        </ul>
    
                        </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Navbar;