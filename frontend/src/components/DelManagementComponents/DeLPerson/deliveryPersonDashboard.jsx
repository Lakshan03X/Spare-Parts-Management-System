import { Routes, Route } from "react-router-dom";





import "../../../App.css";
import SideMenu from "./side-menu";
import Dashboard from "./dashboard";
import Report from "./report";

function DeliveryPersonDashboard() {
  return (
    <div id="main">
      <SideMenu />
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="report" element={<Report/>}/>
      </Routes>
    </div>
  );
}

export default DeliveryPersonDashboard;
