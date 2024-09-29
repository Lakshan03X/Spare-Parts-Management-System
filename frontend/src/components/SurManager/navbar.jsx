import React from "react";
import { Link } from 'react-router-dom';
import '../../css/survey/surNavbar.css'



function NavBar() {

    return <>

        <nav className="surNav">
            <h1 className="nav-header">SPM</h1>

            <ul className="nav-content">
                <li><Link to="dashboard" className="nav-link">Dashboard</Link></li>
                <li><Link to="surveys" className="nav-link">Surveys</Link></li>
            </ul>

            <a href="" className="nav-link">Logout</a>
            
        </nav>

    </>

}


export default NavBar