import { IRes } from "../../entity";
import { apiSlices } from "../../app/api/apiSlice";
import { ICartLists, ICartPostReq } from "../../entity/Carts";
import { IOrder, IOrderHistory, IOrderQuery, IOrderReqBody, IOrderTrackingUpdateReqBody, IPaymentOptionResBody } from "../../entity/Order";

export const orderApiSlice = apiSlices.injectEndpoints({
    endpoints: builder => ({
        postOrders: builder.mutation<any, IOrderReqBody>({
            query: (payload) => ({
                url: "/orders",
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Cart']
        }),
        getPaymentOption: builder.query<IRes<IPaymentOptionResBody>, void>({
            query: () => ({
                url: "/orders/payment",
                method: 'GET',
            }),
        }),
        getOrders: builder.query<IRes<IOrderHistory>, void>({
            query: () => ({
                url: "/orders",
                method: 'GET',
            }),
        }),
        getAdminOrders: builder.query<IRes<IOrderHistory>, IOrderQuery>({
            query: (args) => {
                return ({
                    url: '/orders/status',
                    params: args
                })
            },
            providesTags: ['Menu']
        }),
        postUpdateAdminOrders: builder.mutation<any, IOrderTrackingUpdateReqBody>({
            query: (payload) => ({
                url: '/orders/status',
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Menu']
        }),
    })
})

export const {
    usePostOrdersMutation,
    useGetPaymentOptionQuery,
    useGetOrdersQuery,
    useLazyGetPaymentOptionQuery,
    useGetAdminOrdersQuery,
    usePostUpdateAdminOrdersMutation,
} = orderApiSlice