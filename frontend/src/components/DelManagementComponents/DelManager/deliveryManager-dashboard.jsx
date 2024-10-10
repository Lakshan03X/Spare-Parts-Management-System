import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import SideMenu from "./side-menu";
import Order from "./order";
import Report from "./report";
import "../../../App.css";
import DelPerson from "./delPersons";
import Track from "./track";


function DeliveryManagerDashboard() {
  return (
    <div id="main">
      <SideMenu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="order" element={<Order />} />
        <Route path="report" element={<Report />} />
        <Route path="delPerson" element={<DelPerson/>} />
        <Route path="track" element={<Track/>} />
      </Routes>
    </div>
  );
}

export default DeliveryManagerDashboard;
