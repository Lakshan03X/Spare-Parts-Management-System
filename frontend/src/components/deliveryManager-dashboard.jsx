






import { Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard-Components/dashboard";
import SideMenu from "./Dashboard-Components/side-menu";
import Order from "./Dashboard-Components/order";

import '../App.css';

function DeliveryManagerDashboard() {
    return (
        <div className='main'>
            <SideMenu />
            <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='order' element={<Order />} />
            </Routes>

        </div>
    );
}

export default DeliveryManagerDashboard;
