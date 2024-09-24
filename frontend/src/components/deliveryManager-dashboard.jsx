import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard-Components/dashboard";
import SideMenu from "./Dashboard-Components/side-menu";
import Order from "./Dashboard-Components/order";
import Report from "./Dashboard-Components/report";

import "../App.css";

function DeliveryManagerDashboard() {
  return (
    <div className="main">
      <SideMenu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="order" element={<Order />} />
        <Route path="report" element={<Report />} />
      </Routes>
    </div>
  );
}

export default DeliveryManagerDashboard;
