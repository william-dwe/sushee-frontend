import { BaseQueryApi, BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut } from '../../features/authSlice'
import { RootState } from '../store'

const baseUrl = (process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:8080/v1')
const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include',
    prepareHeaders: (headers: Headers, { getState }) => {
        const currentState = getState() as RootState
        const token = currentState.auth
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth: BaseQueryFn = async (args: string, api: BaseQueryApi, extraOptions: {shout?: boolean}) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.meta?.response?.status === 401) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            result = await baseQuery(args, api, extraOptions)
            return result
        }
        api.dispatch(logOut())
    }
    return result
}

export const apiSlices = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes:['Profile', 'Menu', 'Cart', 'Coupon'],
    endpoints: () => ({}),
})
