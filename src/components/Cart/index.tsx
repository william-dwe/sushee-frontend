import React from 'react'
import "./index.scss"
import { selectCartToggle, setCartToggle } from '../../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCartQuery } from '../../features/cartSlice/cartApiSlice';
import {BsFillCartFill} from 'react-icons/bs'
import { selectIsLoggedIn, selectModalToggle, setModalToggle } from '../../features/authSlice';

export default function Cart(): JSX.Element {
    const dispatch = useDispatch()
    const cartToggle = useSelector(selectCartToggle)
    const modalToggle = useSelector(selectModalToggle)
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {data: cart, isLoading: isCartLoading } = useGetCartQuery()

    const handleOpenCart = ((e: any) => {
        if (!isLoggedIn) {
            dispatch(setModalToggle(!modalToggle))
            return
        }
        dispatch(setCartToggle(!cartToggle))
    })

    return (
        <div className='cart'>
            <button className="btn cart-toggle" onClick={handleOpenCart}><BsFillCartFill/></button>
            {
                cart && cart?.data.carts.length > 0
                ? <span className="notification">{cart?.data.carts.length}</span>
                : <></>
            }
        </div>
    )
}