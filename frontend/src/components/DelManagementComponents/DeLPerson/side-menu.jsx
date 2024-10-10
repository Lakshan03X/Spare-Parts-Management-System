







import { Link,useNavigate } from 'react-router-dom';

function SideMenu() {

    const userData = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.clear()
        navigate('/delPersonLogin')
    }

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
                        <Link to="deliveries" className="dash-menu-links" id="1">Deliveries</Link>
                    </div>

                    

                    {/* Reportings Link */}
                    <div className="dash-menu-items">
                        <i className="fa-solid fa-message icon-size"></i>
                        <Link to="report" className="dash-menu-links" id="2">Reportings</Link>
                    </div>

                    {/* Track Link */}
                    <div className="dash-menu-items">
                        <i className="fa-solid fa-map-location-dot icon-size"></i>
                        <Link to="track" className="dash-menu-links" id="3">Mark Progress</Link>
                    </div>
                </div>

                <div className="dash-menu-sec2">
                    <hr/>
                    <div className="dash-menu-items">
                        <i className="fa-solid fa-right-from-bracket icon-size"></i>
                        
                        <button onClick={logOut}>Log Out</button>
                    </div>
                </div>
            </div>
        </nav>
    </>;
}

export default SideMenu;
