import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DelManagerSignUp from "./components/Account/delManagerReg";
import DelManagerLogin from "./components/Account/delManagerLogin";
import DeliveryManagerDashboard from "./components/DelManagementComponents/DelManager/deliveryManager-dashboard";
import DelPersonSignUp from "./components/Account/delPersonReg";
import DelPersonLogin from "./components/Account/delPersonLogin";
import DeliveryPersonDashboard from "./components/DelManagementComponents/DeLPerson/deliveryPersonDashboard";
import DelReportUpdate from "./components/DelManagementComponents/DeLPerson/report_util/delReportUpdate"


//importing supplier components
import SupplierInventory from "./components/Supplier/sup_inventory/sup_inv";
import ViewItems from "./components/Supplier/sup_inventory/view_item";
import AddItems from "./components/Supplier/sup_inventory/sup_inv_add";
import UpdateItem from "./components/Supplier/sup_inventory/sup_inv_update";
import SupplierReport from "./components/Supplier/sup_report/sup_rept";
import SupplierDashboard from "./components/Supplier/sup_dashboad/sup_dashboard";
//importing order components
import OderDash from "./components/Oder/oder_dash/OderDash";
import HomePage from "./components/User_Home_Sec/Home_page/Home_page";
import HomeInventory from "./components/User_Home_Sec/Home_inventory/Home_inventory";
import HomeOrder from "./components/User_Home_Sec/Home_Oders/Home_oder";
import Home_AboutUs from "./components/User_Home_Sec/Home_AboutUs/Home_AboutUs";
import Home_Contact from "./components/User_Home_Sec/Home_Contact/Home_Contact";

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/delManagerReg" element={<DelManagerSignUp />} />
          <Route path="/delManagerLogin" element={<DelManagerLogin />} />
          <Route path="/delPersonReg" element={<DelPersonSignUp />} />
          <Route path="/delPersonLogin" element={<DelPersonLogin />} />
          <Route
            path="/deliveryManager/*"
            element={<DeliveryManagerDashboard />}
          />
          <Route
            path="/deliveryPerson/*"
            element={<DeliveryPersonDashboard />}
          />

          <Route
            path="/delReportUpdate/:id"
            element={<DelReportUpdate/>}
          />

          

          {/* this is supplier router paths */}
          <Route path="/supplierInv" element={<SupplierInventory />} />
          <Route path="/view_item/:id" element={<ViewItems />} />
          <Route path="/item_create" element={<AddItems />} />
          <Route path="/supplierReport" element={<SupplierReport />} />
          <Route path="/item_update/:id" element={<UpdateItem />} />
          <Route path="/supplierDashboard" element={<SupplierDashboard />} />

          <Route path="/oder_dash" element={<OderDash />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home_inventory" element={<HomeInventory />} />
          <Route path="/home_order/:id" element={<HomeOrder />} />
          <Route path="/home_aboutUs" element={<Home_AboutUs/>}/>
          <Route path="/home_contact" element={<Home_Contact/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
