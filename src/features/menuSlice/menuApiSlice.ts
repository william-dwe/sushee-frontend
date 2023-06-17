import { IRes } from "../../entity";
import { IMenuLists, IMenuPostReq, IMenuPostUpdateReq, IMenuQuery, IMenuReview, IPromotionLists } from "../../entity/Menus";
import { apiSlices } from "../../app/api/apiSlice";

export const menuApiSlice = apiSlices.injectEndpoints({
    endpoints: builder => ({
        getMenus: builder.query<IRes<IMenuLists>, IMenuQuery>({
            query: (args) => {
                return ({
                    url: '/menus',
                    params: args
                })
            },
            providesTags: ['Menu']
        }),
        getPromotions: builder.query<IRes<IPromotionLists>, void>({
            query: () => ({
                url: '/promotions'
            }),
            providesTags: ['Menu']
        }),
        
        postMenus: builder.mutation<any, IMenuPostReq>({
            query: (payload) => ({
                url: "/menus",
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Menu']
        }),
        postUpdateMenu: builder.mutation<any, IMenuPostUpdateReq>({
            query: (payload) => ({
                url: `/menus/${payload.menu_id}`,
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
            invalidatesTags: ['Menu']
        }),
        deleteMenu: builder.mutation<any, number>({
            query: (menu_id) => ({
                url: `/menus/${menu_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Menu']
        }),
        getMenuReview: builder.query<IRes<IMenuReview>, void>({
            query: (menu_id) => {
                return ({
                    url: `/menus/${menu_id}`,
                })
            },
            providesTags: ['Menu']
        }),
        
    })
})

export const {
    useGetMenusQuery, 
    useGetPromotionsQuery,
    usePostMenusMutation,
    usePostUpdateMenuMutation,
    useDeleteMenuMutation,
    useGetMenuReviewQuery
} = menuApiSlice