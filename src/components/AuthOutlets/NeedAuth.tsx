// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {Outlet, useNavigate } from 'react-router-dom'
// import { selectCurrentToken, selectModalToggle, setCredentials, setModalToggle } from '../../features/authSlice'
// import { useRefreshQuery } from '../../features/authSlice/authApiSlice'
// import jwtDecode from 'jwt-decode'
// import "./NeedAuth.scss"


// const NeedAuth = () : JSX.Element => {
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
//     const modalToggle = useSelector(selectModalToggle)

//     useEffect(() => {
//         if (isSuccess) {
//             dispatch(setCredentials({...response}))
//         }
//     }, [response])

//     const handleContinue = () => {
//         navigate("/login")
//     }

//     const handleModal = () => {
//         dispatch(setModalToggle(!modalToggle))
//     }

//     const content = (
//         authToken 
//         ? <Outlet/>
//         : isLoading
//             ? <h1>loading...</h1>
//             : <>
//             <div className="modal-need-auth">
//                 <div className={`modal-content ${modalToggle?"modal-show":"modal-hide"}`} >
//                     <div className="modal-content-items">
//                         <h2>Please login before ordering menu.</h2>
//                         <div className="buttons">
//                             <button className="btn btn-danger" onClick={handleModal}>Cancel</button>
//                             <button className="btn btn-success" onClick={handleContinue}>Login Now</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Outlet/>
//             </>
//     )
//     return content
// } 
 
// export default NeedAuth

export {}