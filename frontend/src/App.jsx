import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DelManagerSignUp from "./components/Account/delManagerReg";
import DelManagerLogin from "./components/Account/delManagerLogin";
import DeliveryManagerDashboard from "./components/DelManagementComponents/DelManager/deliveryManager-dashboard";
import DelPersonSignUp from "./components/Account/delPersonReg";
import DelPersonLogin from "./components/Account/delPersonLogin";
import DeliveryPersonDashboard from "./components/DelManagementComponents/DeLPerson/deliveryPersonDashboard";
import DelReportUpdate from "./components/DelManagementComponents/DeLPerson/report_util/delReportUpdate";

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
import HomeOrder from "./components/User_Home_Sec/Home_Oders/home_oder";
// import HomeOrder from "./components/User_Home_Sec/Home_Oders/Home_oder";
import Home_AboutUs from "./components/User_Home_Sec/Home_AboutUs/Home_AboutUs";
import Home_Contact from "./components/User_Home_Sec/Home_Contact/Home_Contact";
import Home_feedback from "./components/User_Home_Sec/Home_feedback/Home_feedback";
import AddUser from "./components/Account/user_manager/add_user";
import UserReport from "./components/Account/user_manager/user_rept";
import UserUpdate from "./components/Account/user_manager/Update_user";

//importing feedback components
import FeedbackUpdate from "./components/User_Home_Sec/Home_feedback/home_feedback_update";
//Survey Manager
import SurMangerDashboard from "./components/SurManager/surManagerDashboard";
import SurManagerLogin from "./components/Account/survey_manager/surManagerLogin";
import SurManagerSignUp from "./components/Account/survey_manager/surManagerReg";
import AddSurvey from "./components/SurManager/addServey";
import SurveyView from "./components/SurManager/viewServey";
import UpdateSurvey from "./components/SurManager/updateServay";
import HomeSurvey from "./components/User_Home_Sec/Home_Survay/Home_survay";
import HomeSurveyView from "./components/User_Home_Sec/Home_Survay/Home_survay_view";

import FeddbackAdmin from "./components/Feddback/fed_mg_dashboard";

//Customer
import CustomerLogin from "./components/Account/customer/customerLogin";
import CustomerSignUp from "./components/Account/customer/customerReg";

//Combined Login
import ManagersLogin from "./components/Account/managersLogin";

import SupManagerLogin from "./components/Account/Sup_manager/supManagerLogin";
import SupManagerSignUp from "./components/Account/Sup_manager/delManagerReg";
import AddCard from "./components/User_Home_Sec/Home_Oders/home_oder_card";
function App() {
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/supManagerReg" element={<SupManagerSignUp />} />
          <Route path="/supManagerLogin" element={<SupManagerLogin />} />
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

          <Route path="/delReportUpdate/:id" element={<DelReportUpdate />} />

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
          <Route path="/home_aboutUs" element={<Home_AboutUs />} />
          <Route path="/home_contact" element={<Home_Contact />} />
          <Route path="/home_feedback" element={<Home_feedback />} />
          {/* //user manager */}
          <Route path="/createUser" element={<AddUser />} />
          <Route path="/user_rept" element={<UserReport />} />
          <Route path="/user_update/:id" element={<UserUpdate />} />
          {/* //feedback */}
          <Route path="/feedback_update/:id" element={<FeedbackUpdate />} />

          {/* Survet Manager */}
          <Route path="/surManager/*" element={<SurMangerDashboard />} />
          <Route path="/surManagerLogin" element={<SurManagerLogin />} />
          <Route path="/surManagerReg" element={<SurManagerSignUp />} />
          <Route path="/addSurvey" element={<AddSurvey />} />
          <Route path="/survey/view/:id" element={<SurveyView />} />
          <Route path="/survey/edit/:id" element={<UpdateSurvey />} />

          {/* Customer */}
          <Route path="/customerLogin" element={<CustomerLogin />} />
          <Route path="/customerReg" element={<CustomerSignUp />} />

          <Route path="/home_survey" element={<HomeSurvey />} />
          <Route path="/home_survey/view_survey/:id" element={<HomeSurveyView />} />
          <Route path="/add_card_page" element={<AddCard />} />
          <Route path="/mLogin" element={<ManagersLogin />} />
          <Route path="/fed_mg_dashboard" element={<FeddbackAdmin />} />
          <Route path="/fed_mg_dashboard" element={<FeddbackAdmin />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
