// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {Navigate, Outlet, useLocation } from 'react-router-dom'
// import { selectCurrentRole, selectCurrentToken, setCredentials } from '../../features/authSlice'
// import { useRefreshQuery } from '../../features/authSlice/authApiSlice'
// import Loader from '../Loader'


// const ShouldAuthAdmin = () : JSX.Element => {
//     const location = useLocation()
//     const dispatch = useDispatch()

//     const {
//         data: response,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     } = useRefreshQuery()
//     const authToken = useSelector(selectCurrentToken)
//     const role = useSelector(selectCurrentRole)

//     useEffect(() => {
//         if (isSuccess) {
//             dispatch(setCredentials({...response}))
//         }
//     }, [response])
//     const content = (
//         authToken 
//         ? role == "admin" 
//             ? <Outlet/>
//             : <Navigate to="/" state={{from: location}} replace/> 
//         : isLoading
//             ? <Loader/>
//             : response?.data.access_token
//                 ? response.data.role_name === "admin"
//                     ? <Outlet/>
//                     : <Navigate to="/" state={{from: location}} replace/> 
//                 : <Navigate to="/login" state={{from: location}} replace/> 
//     )
//     return content
// } 
 
// export default ShouldAuthAdmin

export {}