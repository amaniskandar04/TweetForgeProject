import React from "react";
import { Navigate, Link } from "react-router-dom";
import './Menu.css'

function Menu() {


    return (
        <>
            <div className="options">
                <Link to="/login">Login</Link>
                <button>Register</button>
            </div>
        </>
    );
}

export default Menu
