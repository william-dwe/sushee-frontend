import React from 'react';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Auth/Profile';
import ShouldAuthUser from './components/AuthOutlets/ShouldAuthUser';
import Navigation from './components/Navigation'
import {Routes, Route} from 'react-router'
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "bootstrap/dist/js/bootstrap.min.js";
import Menu from './pages/Menu';
import CartOffCanvas from './components/Cart/CartOffcanvas';
// import NeedAuth from './components/AuthOutlets/NeedAuth';
// import ShouldAuthAdmin from './components/AuthOutlets/ShouldAuthAdmin';
import Order from './pages/Order';
// import AdminCoupon from './pages/AdminCoupon';
// import AdminMenu from './pages/AdminMenu';
// import AdminOrder from './pages/AdminOrder';


function App(): JSX.Element {
  return (
    <div className="App">
      <ToastContainer/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route element={<CartOffCanvas/>}>
            <Route element={<Navigation/>}>
              {/* <Route element={<NeedAuth/>}> */}
                <Route path ='/' element={<Menu/>}/>
              {/* </Route> */}
              <Route element={<ShouldAuthUser/>}>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/orders' element={<Order/>}/>
              </Route>
              {/* <Route element={<ShouldAuthAdmin/>}>
                <Route path='/admin/coupon' element={<AdminCoupon/>}/>
                <Route path='/admin/menu' element={<AdminMenu/>}/>
                <Route path='/admin/order' element={<AdminOrder/>}/>
              </Route> */}
            </Route>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
  );
}

export default App;
