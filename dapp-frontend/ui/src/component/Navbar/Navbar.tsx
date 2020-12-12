import React, { useState } from 'react';
import './Navbar.css';
import {NavLink} from "react-router-dom";
import web from "./logos.png";
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';

const Navbar =() =>{

    const [address,setAddress] = useState("Connect to Wallet");

    const loadMetamask = async () => {

        try 
        {
            if (window.ethereum) 
            {
                //@ts-ignore
                window.ethereum.enable();
                const metamaskProvider = new ethers.providers.Web3Provider(window.ethereum);
                const network = await metamaskProvider.getNetwork();

                if (network.chainId === 4) 
                {
                    network.name = 'Rinkeby Test Network';
                    // alert('Please connect with Rinkeby network');
                } 
                // else if (network.chainId === 5196) 
                // {
                //     network.name = 'Test EraSwap Network';
                // } 
                // else if (network.chainId === 5197) 
                // {
                //     network.name = 'Main Era Swap Network';
                // }

                console.log(ethers.Wallet);
                const onCorrectNetwork = network.chainId;

                if (onCorrectNetwork !== 4) 
                {
                    alert('Please connect to rinkeby network ');
                } 
                else 
                {
                    const wallet = await metamaskProvider.getSigner();

                    window.wallet = wallet;

                    console.log('Wallet : ', wallet);
                    const address = await wallet.getAddress();
                    setAddress(address);
                }
            }
        }
        catch(error)
        {
            alert(error.message);
        }
    }

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
                        <NavLink to="/" className="nav-link active" aria-current="page" >Home </NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/Createsurvey" className="nav-link ">Create survey</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/Allsurvey" className="nav-link">All Survey</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/Mysurvey" className="nav-link">My Survey</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/Help"className="nav-link" >Help</NavLink>
                        </li> 
                        <li className="nav-item">
                        <NavLink to="/Form"className="nav-link" >Register</NavLink>
                        </li>
                        <li className="nav-item">
                        <Button className=" nav-link btn btn-info text-dark" onClick={loadMetamask}>{ address }</Button>
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