import React, { useState } from 'react'
import AdminTable from '../../components/AdminTable'
import { useDeleteCouponMutation, useGetCouponsQuery, usePostCouponsMutation, usePostUpdateCouponMutation } from '../../features/couponSlice/couponApiSlice'
import Loader from '../../components/Loader'
import AdminForm from '../../components/AdminForm'
import { toast } from 'react-toastify'
import './index.scss'
import { ICouponPostReq, ICouponPostUpdateReq } from '../../entity/Coupon'

export default function AdminCoupon():JSX.Element {
    const property = {
        title: "Coupon",
        cols: [
            {label:"Id", name:"id"},
            {label:"Description", name:"description"},
            {label:"Discount Amount", name:"discount_amount"},
            {label:"Quota Initial", name:"quota_initial"},
            {label:"Quota Left", name:"quota_left"},
        ] 
    }

    const {data: coupon, isLoading: isCouponLoading } = useGetCouponsQuery()
    const [deleteCoupon] = useDeleteCouponMutation()
    const [updateCoupon] = usePostUpdateCouponMutation()
    const [postCoupon] = usePostCouponsMutation()

    const handleDelete = (e: any) => deleteCoupon(e.target.value)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (e.nativeEvent.submitter.name === "edit") {
                const reqBody: ICouponPostUpdateReq = {
                    coupon_id: parseInt(e.target["id"].value),
                    description: e.target["description"].value,
                    discount_amount: parseInt(e.target["discount_amount"].value),
                    quota_initial: parseInt(e.target["quota_initial"].value),
                    quota_left: parseInt(e.target["quota_left"].value),
                } 
                updateCoupon(reqBody)
                toast.success(`${property.title} edited`)
            } 
            if (e.nativeEvent.submitter.name === "add") {
                const reqBody: ICouponPostReq = {
                    description: e.target["description"].value,
                    discount_amount: parseInt(e.target["discount_amount"].value),
                    quota_initial: parseInt(e.target["quota_initial"].value),
                    quota_left: parseInt(e.target["quota_left"].value),
                } 
                postCoupon(reqBody)
                toast.success(`${property.title} added`)
            }
        } catch (err: any) {
            toast.error(err.data.message)
        }
    }
    
    

    const content = (
        <div className="admin-coupon-page">
            {
                !isCouponLoading && coupon 
                ? <AdminTable
                    title={property.title}
                    thList={property.cols.map((val)=>val.label)}
                    tdLists={Object.values(coupon.data.coupons.map((val) => {
                        return [
                            val.id.toString(),
                            val.description,
                            val.discount_amount.toString(),
                            val.quota_initial.toString(),
                            val.quota_left.toString(),
                        ]
                    }))}
                    handleDelete={handleDelete}
                />
                : <Loader/>
            }
            <AdminForm
                cols={property.cols}
                handleSubmit={handleSubmit}
            />
        </div>
        
    )

    return content
}
 