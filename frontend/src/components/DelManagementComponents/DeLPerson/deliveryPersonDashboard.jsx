import { Routes, Route } from "react-router-dom";


import "../../../App.css";
import SideMenu from "./side-menu";
import Dashboard from "./dashboard";

function DeliveryPersonDashboard() {
  return (
    <div className="main">
      <SideMenu />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default DeliveryPersonDashboard;
