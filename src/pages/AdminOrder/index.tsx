import React, { useState } from 'react'
import AdminTable from '../../components/AdminTable'
import { useDeleteCouponMutation, useGetCouponsQuery, usePostCouponsMutation, usePostUpdateCouponMutation } from '../../features/couponSlice/couponApiSlice'
import Loader from '../../components/Loader'
import AdminForm from '../../components/AdminForm'
import { toast } from 'react-toastify'
import './index.scss'
import { useGetAdminOrdersQuery, usePostUpdateAdminOrdersMutation } from '../../features/orderSlice/orderApiSlice'
import { useSelector } from 'react-redux'
import { selectOrderFilterQuery } from '../../features/orderSlice'
import { IOrderTrackingUpdateReqBody } from '../../entity/Order'
import moment from 'moment'

export default function AdminOrder():JSX.Element {
    const property = {
        title: "Order",
        cols: [
            {label:"Id", name:"id"},
            {label:"User Id", name:"user_id"},
            {label:"Order Date", name:"order_date"},
            {label:"Coupon Id", name:"coupon_id"},
            {label:"Payment Option Id", name:"payment_option_id"},
            {label:"Ordered Menus", name:"ordered_menus"},
            {label:"Gross Amount", name:"gross_amount"},
            {label:"Discount Amount", name:"discount_amount"},
            {label:"Net Amount", name:"net_amount"},
            {label:"Status", name:"status"},
        ] 
    }

    const filterQuery = useSelector(selectOrderFilterQuery)
    const {data: order, isLoading: isOrderLoading } = useGetAdminOrdersQuery(filterQuery)
    const [updateOrder] = usePostUpdateAdminOrdersMutation()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (e.nativeEvent.submitter.name === "edit") {
                const reqBody: IOrderTrackingUpdateReqBody = {
                    order_id: parseInt(e.target["id"].value),
                    status: e.target["status"].value,
                } 
                updateOrder(reqBody)
                toast.success(`${property.title} edited`)
            } 
        } catch (err: any) {
            toast.error(err.data.message)
        }
    }
    
    

    const content = (
        <div className="admin-order-page">
            {
                !isOrderLoading && order 
                ? <AdminTable
                    title={property.title}
                    thList={property.cols.map((val)=>val.label)}
                    tdLists={Object.values(order.data.orders.map((val) => {
                        return [
                            val.id.toString(),
                            val.user_id.toString(),
                            moment(val.order_date).format('MMMM Do YYYY, h:mm:ss a'), // MOMENT HERE
                            val.coupon_id ? val.coupon_id.toString() : "",
                            val.payment_option_id.toString(),
                            val.ordered_menus.toString(),
                            val.gross_amount.toString(),
                            val.discount_amount.toString(),
                            val.net_amount.toString(),
                            val.status,
                        ]
                    }))}
                />
                : <Loader/>
            }
            <AdminForm
                cols={property.cols.filter((val) => ["id", "status"].includes(val.name))}
                handleSubmit={handleSubmit}
            />
        </div>
        
    )

    return content
}
 