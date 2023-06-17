import React from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import './index.scss'
import Cart from '../Cart';
import {BiUpArrow} from 'react-icons/bi'
// import { selectCurrentRole } from '../../features/authSlice';
import { selectIsLoggedIn } from '../../features/authSlice';
import { useSelector } from 'react-redux';

export default function Navigation(): JSX.Element {
    // const role = useSelector(selectCurrentRole)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
            <nav>
                <p className='logo'>Sushee!</p>
                <div className='navbar'>
                    <span><NavLink to='/'>Home</NavLink></span>
                    {
                        
                        isLoggedIn
                        ? <>
                        <span><NavLink end to='profile'>Profile</NavLink></span>
                        {/* <span><NavLink end to='orders'>Orders</NavLink></span> */}
                        {/* <span><NavLink to='games'>Games</NavLink></span> */}
                        <Cart/>
                        </>
                        // : role === "admin" 
                        //     ? <>
                        //         <span><NavLink end to='admin/coupon'>Coupon</NavLink></span>
                        //         <span><NavLink end to='admin/menu'>Menu</NavLink></span>
                        //         <span><NavLink end to='admin/order'>Order</NavLink></span>
                                
                        //     </>
                            : <>
                                <span><NavLink end to='login'>Login</NavLink></span>
                                <span><NavLink end to='register'>Register</NavLink></span>
                            </>
                    }
                </div>
            </nav>

            <button
                type="button"
                id='goToTop'
                className="btn btn-dark btn-floating"
                onClick={()=>window.scrollTo({top:0, behavior:"smooth"})}
            >
                <span><BiUpArrow/></span>
            </button>
            <Outlet/>
        </div >
    )
}