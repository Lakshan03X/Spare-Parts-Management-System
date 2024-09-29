import { Routes, Route } from "react-router-dom";





import NavBar from "./navbar";
import Survey from "./survay";
import SurDashboard from "./surDashboard";

function  SurMangerDashboard() {
  return (
    <div>
        <NavBar/>
        <Routes>
        <Route path="/" element={<SurDashboard />} />
        <Route path="dashboard" element={<SurDashboard />} />
        <Route path="surveys" element={<Survey />} />
      </Routes>
    </div>
  );
}

export default SurMangerDashboard;
