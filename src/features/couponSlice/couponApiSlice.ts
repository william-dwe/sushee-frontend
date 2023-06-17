import { IRes } from "../../entity";
import { apiSlices } from "../../app/api/apiSlice";
import { ICoupons, ICouponPostReq, ICouponPostUpdateReq, IUserCouponPostReq, IUserCouponsResBody } from "../../entity/Coupon";

export const couponApiSlice = apiSlices.injectEndpoints({
    endpoints: builder => ({
        getCoupons: builder.query<IRes<ICoupons>, void>({
            query: (args) => {
                return ({
                    url: '/coupons',
                    params: args
                })
            },
            providesTags: ['Coupon']
        }),
        postCoupons: builder.mutation<any, ICouponPostReq>({
            query: (payload) => ({
                url: "/coupons",
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Coupon']
        }),
        postUpdateCoupon: builder.mutation<any, ICouponPostUpdateReq>({
            query: (payload) => ({
                url: `/coupons/${payload.coupon_id}`,
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Coupon']
        }),
        deleteCoupon: builder.mutation<any, number>({
            query: (coupon_id) => ({
                url: `/coupons/${coupon_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Coupon']
        }),
        postUserCoupons: builder.mutation<any, IUserCouponPostReq>({
            query: (payload) => ({
                url: "/users/coupons",
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Coupon']
        }),
        getUserCoupon: builder.query<IRes<IUserCouponsResBody>, void>({
            query: () => {
                return ({
                    url: '/users/coupons'
                })
            },
            providesTags: ['Cart']
        }),
    })
})

export const {
    useGetCouponsQuery,
    usePostCouponsMutation,
    usePostUpdateCouponMutation,
    useDeleteCouponMutation,
    useGetUserCouponQuery,
    useLazyGetUserCouponQuery,

} = couponApiSlice