import { Routes, Route } from "react-router-dom";





import "../../../App.css";
import SideMenu from "./side-menu";
import Dashboard from "./dashboard";
import Report from "./report";
import Track from "./markProgress";
import Deliveries from "./deliveries";



function DeliveryPersonDashboard() {
  return (
    <div id="main">
      <SideMenu />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="report" element={<Report/>}/>
        <Route path="track" element={<Track/>} />
        <Route path="deliveries" element={<Deliveries/>} />
      </Routes>
    </div>
  );
}

export default DeliveryPersonDashboard;
