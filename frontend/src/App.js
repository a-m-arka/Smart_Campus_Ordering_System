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
import VendorMenu from './pages/VendorMenu/vendorMenu';
import StudentProfile from './pages/Profiles/studentProfile';
import VendorProfile from './pages/Profiles/vendorProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
            <Route path='foods' element={<Foods />} />
            <Route path='vendors' element={<Vendors />} />
            <Route path='vendor/:id' element={<VendorMenu />} />
            <Route path='cart' element={<Cart />} />
            <Route path='user_profile' element={<StudentProfile />} />
            <Route path='vendor_profile' element={<VendorProfile />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
