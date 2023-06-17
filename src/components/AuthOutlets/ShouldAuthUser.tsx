import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectCurrentUser, setUser, selectIsLoggedIn } from '../../features/authSlice'
import { useGetProfileQuery } from '../../features/authSlice/authApiSlice'
import Loader from '../Loader'
import { useAppSelector } from '../../app/hooks'


const ShouldAuthUser = () : JSX.Element => {
    const location = useLocation()
    const dispatch = useDispatch()

    
    // TODO: check if user is logged in (check from cookie)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const user = useAppSelector(selectCurrentUser)    

    // TODO: if user is not loggedin / user not exist in cookie
    // <hit whoisme/ profile api>
    const { data: result, isLoading } = useGetProfileQuery(undefined, {
        skip: !isLoggedIn || (!isLoggedIn && !user),
    });
    
    

    // when profile return, useEffect (profile results) -> dispatch setuser
    useEffect(() => {
        if (!result) return;
        dispatch(setUser(result));
    }, [result, isLoggedIn, user]);


    // TODO: if isLoading return <Loader>

    if (isLoading ) {
        return <Loader/>
    }

    // TODO: Lastly,
    // return navbar + outlet

    // const {
    //     data: response,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // } = useRefreshQuery()
    // const authToken = useSelector(selectCurrentToken)
    // const role = useSelector(selectCurrentRole)

    return <Outlet />
} 
 
export default ShouldAuthUser