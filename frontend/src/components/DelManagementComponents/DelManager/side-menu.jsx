import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function SideMenu() {

    return <>
        <nav className="dash-nav">
            <h1 className="logo">SMS</h1>
            <div className="dash-menu">
                <div className="dash-menu-sec1">
                    <p className="head-text">Main Menu</p>

                    {/* Dashboard Link */}
                    <div className="dash-menu-items active">
                        <i className="fa-brands fa-dropbox icon-size"></i>
                        <Link to="dashboard" className="dash-menu-links" id="0">Dashboard</Link>
                    </div>

                    {/* Orders Link */}
                    <div className="dash-menu-items">
                        <i className="fa-solid fa-cart-shopping icon-size"></i>
                        <Link to="order" className="dash-menu-links" id="1">Orders</Link>
                    </div>

                    {/* Sub-menu */}
                    <div className="dash-sub">
                        <ul>
                            <li>New</li>
                            <li>Pending</li>
                            <li>Completed</li>
                        </ul>
                    </div>

                    {/* Reportings Link */}
                    <div className="dash-menu-items">
                        <i className="fa-solid fa-message icon-size"></i>
                        <Link to="report" className="dash-menu-links" id="2">Reportings</Link>
                    </div>

                    {/* Track Link */}
                    <div className="dash-menu-items">
                        <i className="fa-solid fa-map-location-dot icon-size"></i>
                        <Link to="#" className="dash-menu-links" id="3">Track</Link>
                    </div>
                </div>

                <div className="dash-menu-sec2">
                    <hr/>
                    <div className="dash-menu-items">
                        <i className="fa-solid fa-right-from-bracket icon-size"></i>
                        <Link to="#" className="dash-menu-links">Log Out</Link>
                    </div>
                </div>
            </div>
        </nav>
    </>;
}

export default SideMenu;
