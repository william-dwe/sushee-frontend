// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
// import { selectCurrentToken, setCredentials } from '../../features/authSlice'
// import { useRefreshQuery } from '../../features/authSlice/authApiSlice'
// import Loader from '../Loader'


// const ShouldNotAuth = () : JSX.Element => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const {
//         data: response,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     } = useRefreshQuery()
//     const authToken = useSelector(selectCurrentToken)

//     useEffect(() => {
//         if (isSuccess && !authToken) {
//             dispatch(setCredentials({...response}))
//         }
//     }, [response])
//     useEffect(()=>{
//         if (authToken) {
//             navigate('/')
//         }
//     },[authToken])

//     const content = ( 
//         isLoading && isError
//             ? <Loader/>
//             : <Outlet/>
//     )
//     return content
// } 
 
// export default ShouldNotAuth

export {}