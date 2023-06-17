import React from 'react'
import { useGetOrdersQuery } from '../../features/orderSlice/orderApiSlice'
import moment from 'moment'
import "./index.scss"
import {BsPencil} from "react-icons/bs"

const Order = (): JSX.Element => {
    const { data: order, isLoading: isOrderLoading } = useGetOrdersQuery()

    const handleReview = (e: any) => {
        // todo: show review input modal, pass the "ordered_menu_id" using e.target.value
        console.log(e.target.value)
    }

    return <section className="order-history">
        <h1>ORDER HISTORY</h1>
        <table className="order-history">
            <thead>
                <tr>
                    <th>Order Date</th>
                    <th>Coupon Id</th>
                    <th>Payment Option Id</th>
                    <th>Total Amount</th>
                    <th>Ordered Menus & Reviews</th>
                </tr>
            </thead>
            <tbody>
            {
                !isOrderLoading && order?.data.orders && 
                order.data.orders.map((val, i) => {
                    return <tr key={i}>
                        <td>{moment(val.order_date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                        <td>{val.coupon_id}</td>
                        <td>{val.payment_option_id}</td>
                        <td>{val.net_amount}</td>
                        <div className="menu-reviews">
                        {
                            val.ordered_menus.map((ordered_menu, j) => {
                                return <>
                                    <div className="menu-review-title" key={j}>
                                        <h5>{ordered_menu.quantity}pc(s) {ordered_menu.menu.menu_name}</h5>
                                        {
                                            !ordered_menu.review.review_description
                                            ? <td>
                                                <button 
                                                    className='btn btn-warning' 
                                                    value={ordered_menu.id}
                                                    onClick={handleReview}
                                                ><BsPencil/> Review</button>
                                            </td>
                                            : <></>
                                        }
                                    </div>
                                    {
                                        ordered_menu.review.review_description
                                        ? <div className="menu-review-content">
                                            <td>&#34;{ ordered_menu.review.review_description }&#34;</td>
                                        </div>
                                        : <></>
                                    }
                                </>
                            })
                        }
                        </div>
                    </tr>
                })
            }
            </tbody>
        </table>
    </section>
}

export default Order