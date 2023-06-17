import React, { useEffect, useState } from 'react'
import "./index.scss"
import { removeCarts, selectCartToggle, selectCoupon, selectSelectedCart, selectSelectedCoupon, setCartToggle } from '../../../features/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import CartCard from '../CartCard';
import { useDeleteAllCartsMutation, useLazyGetCartQuery } from '../../../features/cartSlice/cartApiSlice';
import DropUp from '../../DropUp';
import { useLazyGetPaymentOptionQuery, usePostOrdersMutation } from '../../../features/orderSlice/orderApiSlice';
import { IOrderReqBody, IPaymentOptionResBody } from '../../../entity/Order';
import DropDown from '../../DropDown';
import { ICartLists } from '../../../entity/Carts';
import { toast } from 'react-toastify';
import { useLazyGetUserCouponQuery } from '../../../features/couponSlice/couponApiSlice';
import { IUserCoupon } from '../../../entity/Coupon';

export default function CartOffCanvas(): JSX.Element {
    const dispatch = useDispatch()
    const cartToggle = useSelector(selectCartToggle)
    const selectedCart = useSelector(selectSelectedCart)
    const selectedCoupon = useSelector(selectSelectedCoupon)

    const [deleteAllCarts] = useDeleteAllCartsMutation()
    const [postOrders] = usePostOrdersMutation()

    const [getCart, getCartResult] = useLazyGetCartQuery()
    const [cart, setCart] = useState<ICartLists>()
    useEffect(()=> {
        if(getCartResult && getCartResult.data) {
            setCart(getCartResult.data.data)
        }
    }, [getCartResult])

    const [getPaymentOption, getPaymentOptionResult] = useLazyGetPaymentOptionQuery()
    const [paymentOption, setPaymentOption] = useState<IPaymentOptionResBody>()
    useEffect(()=> {
        if(getPaymentOptionResult && getPaymentOptionResult.data) {
            setPaymentOption(getPaymentOptionResult.data.data)
        }
    }, [getPaymentOptionResult])

    // const [getCoupon, getCouponResult] = useLazyGetUserCouponQuery()
    // const [coupon, setCoupon] = useState<IUserCoupon[]>()
    // useEffect(()=> {
    //     if(getCouponResult && getCouponResult.data) {
    //         setCoupon(getCouponResult.data.data.user_coupons)
    //     }
    // }, [getCouponResult])

    useEffect(()=>{
        if (cartToggle) {
            getCart()
            getPaymentOption()
            // getCoupon()
        }
    }, [cartToggle])

    const handleOpenCart = (() => {
        dispatch(setCartToggle(!cartToggle))
    })
    const handleDelete = () => {
        deleteAllCarts()
    }
    const handleCoupon = (e: any) => {
        dispatch(selectCoupon(e.target.value))
    }
    const handleOrder = (async (e: any) => {
        try {
            const reqBody = {
                cart_id_list: selectedCart,
                payment_option_id: Number(e.target.value),
                // coupon_code: selectedCoupon,
            } as IOrderReqBody
            postOrders(reqBody)
            dispatch(removeCarts(selectedCart))
            toast.success('Order succeed, please proceed with the payment')
        } catch (err: any) {
            toast.error(err.data.data.message)
        }
    })

    return (
        <div className='cart-wrapper'>
            <div className={`cart-offcanvas ${cartToggle ? "cart-open" : "cart-close"}`}>
                <div className="content">
                    <button type="button" className="btn-close btn-close-white cart-toggle" aria-label="Close" onClick={handleOpenCart}></button>
                    <h2>Ready to Order?</h2>
                    <hr/>
                    <div className="container">
                        {cart
                        ? cart.carts.map((val, i) => {
                            console.log("DEBUG:", val.menu)
                            return <CartCard
                                id={val.id}
                                menu={val.menu}
                                promotion_id={val.promotion_id}
                                quantity={val.quantity}
                                menu_option={val.menu_option}
                                promotion_price={val.promotion_price}
                                key={i}
                            />
                        })
                        :<></>
                    }
                    </div>
                    {
                        cart?.carts.length !== 0
                        ? <>
                            <hr/>
                            <p className="total">Total Price: IDR 
                            { 
                                cart 
                                ? (cart.carts.reduce((cum, x) => {
                                    if (!selectedCart.includes(x.id)) {
                                        return cum+0
                                    }
                                    const item_price = x.promotion_price ? x.promotion_price : x.menu.price
                                    return cum+item_price*x.quantity
                                }, 0)).toLocaleString('id-ID')
                                : 0
                            }
                            </p>
                            {/* <div className="coupon">
                                {
                                    coupon &&
                                    <DropDown 
                                        name="coupon" 
                                        handle={handleCoupon} 
                                        coupons={coupon}
                                    ></DropDown>
                                }
                            </div> */}
                        </>
                        : <p className='note'>Add some item here :D!</p>
                    }
                    
                    <div className="cart-footer">
                        <button className="delete-all btn btn-danger" onClick={handleDelete}>Delete All</button>
                        {
                            paymentOption &&
                            <DropUp text="Order Now!" content={
                                paymentOption.payment_options.map((val, i) => {
                                    return {
                                        label: val.payment_name,
                                        value: val.id,
                                        handler: handleOrder,
                                        key: i,
                                    }
                                }
                            )}
                            />
                        }
                    </div>
                </div>
            </div>
            <div className={`main-content ${cartToggle ? "cart-open" : "cart-close"}`}>
                <Outlet/>
            </div>
        </div>
    )
}