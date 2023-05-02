import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import * as fcl from "@onflow/fcl";

function Navbar() {
    const [user, setUser] = useState();
    const login = () => {
        fcl.authenticate();
        fcl.currentUser().subscribe(setUser);
    };
  return (
    <div class="nav">
        <div class="navbar">
            <div class="dropdown">
                <button class="dropbtn"> 
                    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path fill="currentColor" d="M115.935 822.696v-68.131h728.13v68.131h-728.13Zm0-212.631v-68.13h728.13v68.13h-728.13Zm0-212.63v-68.37h728.13v68.37h-728.13Z"/></svg>
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <Link to="/">Home</Link>
                    <Link to="/Create">Create NFT</Link>
                    <Link to="/Get">Get NFT</Link>
                    <Link to="/About">About</Link>
                </div>
            </div>
            <div class="Nav-Btns">
                    <button onClick={login} className="Nav-Button"> <h2>Login</h2> </button>
                    <button onClick={login} className="Nav-Button"> <h2>Logout</h2>  </button>
            </div>
            <h1 class="SiteName"> Flow NFT </h1>
        </div>
    </div>
  );
}

export default Navbar;