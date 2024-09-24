import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DelManagerSignUp from './components/Account/delManagerReg';
import DelManagerLogin from './components/Account/delManagerLogin';
import DeliveryManagerDashboard from './components/DelManagementComponents/DelManager/deliveryManager-dashboard';
import DelPersonSignUp from './components/Account/delPersonReg';
import DeliveryPersonDashboard from './components/DelManagementComponents/DeLPerson/deliveryPersonDashboard';

function App() {
  return (
    <div className='main'>
      <Router>
        <Routes>
        <Route path='/' element={<DelManagerLogin />} />
          <Route path='/delManagerReg' element={<DelManagerSignUp />} />
          <Route path='/delManagerLogin' element={<DelManagerLogin />} />
          <Route path='/delPersonReg' element={<DelPersonSignUp />} />
          <Route path='/deliveryManager/*' element={<DeliveryManagerDashboard />} />
          <Route path='/deliveryPerson/*' element={<DeliveryPersonDashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
