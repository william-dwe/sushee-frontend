import { IRes } from "../../entity";
import { apiSlices } from "../../app/api/apiSlice";
import { ICartLists, ICartPostReq } from "../../entity/Carts";

export const cartApiSlice = apiSlices.injectEndpoints({
    endpoints: builder => ({
        getCart: builder.query<IRes<ICartLists>, void>({
            query: () => {
                return ({
                    url: '/carts'
                })
            },
            providesTags: ['Cart']
        }),
        postCarts: builder.mutation<any, ICartPostReq>({
            query: (payload) => ({
                url: "/carts",
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Cart']
        }),
        postUpdateCart: builder.mutation<any, ICartPostReq>({
            query: (payload) => ({
                url: `/carts/${payload.cart_id}`,
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Cart']
        }),
        deleteCarts: builder.mutation<any, number>({
            query: (cartId) => ({
                url: `/carts/${cartId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart']
        }),
        deleteAllCarts: builder.mutation<any, void>({
            query: () => ({
                url: "/carts",
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart']
        }),
    })
})

export const {
    useGetCartQuery,
    usePostCartsMutation,
    usePostUpdateCartMutation,
    useDeleteCartsMutation,
    useDeleteAllCartsMutation,
    useLazyGetCartQuery,
} = cartApiSlice