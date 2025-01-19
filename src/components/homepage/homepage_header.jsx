import React from "react"
import { Link } from "react-router-dom"
import logo from "../../../assets/images/animeflix-logo.svg"
import { useLocation } from 'react-router-dom';


const HomePageHeader = () => {
    const location = useLocation()

    return (
        <header className="auth-header" style={location.pathname === '/' ? { background: 'transparent' } : { 'background-color': '#000' }}>
            <div className="logo-container">
                <img src={logo} alt="logo" className="logo"/>
            </div>
            { location.pathname === '/' ? 
                (         
                    <div className="header-button-container">
                        <Link to="/login">
                            <button className="header-button" type="submit">Sign In</button>
                        </Link>
                    </div>
                ) 
                :    
                    <div></div>
            }
        </header>
    )
}

export default HomePageHeader

// - add a pointer for the logo
// - If anything goes wrong with the photos rename the assets folder ad change the path(webpack)