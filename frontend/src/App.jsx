import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DelManagerSignUp from "./components/Account/delManagerReg";
import DelManagerLogin from "./components/Account/delManagerLogin";
import DeliveryManagerDashboard from "./components/DelManagementComponents/DelManager/deliveryManager-dashboard";
import DelPersonSignUp from "./components/Account/delPersonReg";
import DeliveryPersonDashboard from "./components/DelManagementComponents/DeLPerson/deliveryPersonDashboard";
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

function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" element={<DelManagerLogin />} />
          <Route path="/delManagerReg" element={<DelManagerSignUp />} />
          <Route path="/delManagerLogin" element={<DelManagerLogin />} />
          <Route path="/delPersonReg" element={<DelPersonSignUp />} />
          <Route
            path="/deliveryManager/*"
            element={<DeliveryManagerDashboard />}
          />
          <Route
            path="/deliveryPerson/*"
            element={<DeliveryPersonDashboard />}
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
