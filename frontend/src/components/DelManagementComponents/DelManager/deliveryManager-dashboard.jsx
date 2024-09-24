import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import SideMenu from "./side-menu";
import Order from "./order";
import Report from "./report";

import "../../../App.css";

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
