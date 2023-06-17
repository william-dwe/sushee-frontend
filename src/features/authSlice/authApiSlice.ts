import { apiSlices } from "../../app/api/apiSlice";
import { IRes } from "../../entity";
import { IAuthReqLogin, IAuthReqRegister, IToken, IGetProfileRes } from "../../entity/UserAuth";

export const authApiSlice = apiSlices.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<any, IAuthReqLogin>({
            query: (payload) => ({
                url: '/login',
                method: 'POST',
                body: {... payload},
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
        }),
        register: builder.mutation<any, IAuthReqRegister>({
            query: (payload) => ({
                url: '/register',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
        }),
        refresh: builder.query<IRes<IToken>, void>({
            query: () => ({
                url: '/refresh',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
        }),
        getProfile: builder.query<IGetProfileRes, void>({
            query: () => ({
                url: '/profile',
                method: 'GET',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }),
        })
    })
})

export const {
    useGetProfileQuery,
    useLoginMutation,
    useRegisterMutation,
    useRefreshQuery
} = authApiSlice