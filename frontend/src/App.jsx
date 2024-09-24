







import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DelManagerSignUp from './components/Account/delManagerReg';
import DelManagerLogin from './components/Account/delManagerLogin';
import DeliveryManagerDashboard from './components/deliveryManager-dashboard';
import DelPersonSignUp from './components/Account/delPersonReg';

function App() {
  return (
    <div className='main'>
      <Router>
        <Routes>
        <Route path='/' element={<DelManagerLogin />} />
          <Route path='/delManagerReg' element={<DelManagerSignUp />} />
          <Route path='/delManagerLogin' element={<DelManagerLogin />} />
          <Route path='/delPersonReg' element={<DelPersonSignUp />} />
          <Route path='/home/*' element={<DeliveryManagerDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
