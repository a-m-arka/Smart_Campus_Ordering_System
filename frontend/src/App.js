import './App.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';
import Foods from './pages/Foods/foods';
import Vendors from './pages/Vendors/vendors';
import Cart from './pages/Cart/cart';
import VendorMenuForVendor from './pages/VendorMenu/vendorMenuForVendor';
import VendorMenuForUser from './pages/VendorMenu/vendorMenuForUser';
import StudentProfile from './pages/Profiles/studentProfile';
import VendorProfile from './pages/Profiles/vendorProfile';
import StudentOrder from './pages/Order/studentOrder';
import VendorOrder from './pages/Order/vendorOrder';
import PrivateRoute from './components/PrivateRoute/privateRoute';
import ScrollToTop from './components/SrollToTop/scrollToTop';
import { useGlobalContext } from './context/GlobalContext';

function App() {
  const { userRole } = useGlobalContext();
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar />
        <div className="main">
          <Routes>
            <Route path='/'>

              <Route
                index
                element={<Navigate to={userRole === 'vendor' ? '/vendor_profile' : '/home'} />}
              />

              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />

              <Route element={<PrivateRoute allowed={['', 'student']} />}>
                <Route path='home' element={<Home />} />
                <Route path='foods' element={<Foods />} />
                <Route path='vendors'>
                  <Route index element={<Vendors />} />
                  <Route path=':vendorId' element={<VendorMenuForUser />} />
                </Route>
              </Route>

              <Route element={<PrivateRoute allowed={['student']} />}>
                <Route path='cart' element={<Cart />} />
                <Route path='user_profile' element={<StudentProfile />} />
                <Route path='user_order' element={<StudentOrder />} />
              </Route>

              <Route element={<PrivateRoute allowed={['vendor']} />}>
                <Route path='vendor_profile' element={<VendorProfile />} />
                <Route path='vendor_order' element={<VendorOrder />} />
                <Route path='vendor_menu' element={<VendorMenuForVendor />} />
              </Route>

            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
