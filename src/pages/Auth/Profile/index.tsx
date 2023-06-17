import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import InputField from '../../../components/InputField'
import { selectIsLoggedIn } from '../../../features/authSlice'
import {IUserContext} from '../../../entity/UserAuth'
import { useEditProfileMutation, useProfileQuery } from '../../../features/userSlice/userApiSlice'
import Loader from '../../../components/Loader'
import "./index.scss"
import {GiPriceTag} from 'react-icons/gi'
import { toast } from 'react-toastify'
import { useGetUserCouponQuery } from '../../../features/couponSlice/couponApiSlice'

const Profile = (): JSX.Element => {
    const [currentProfileDetail, setCurrentProfileDetail] = React.useState<IUserContext>()
    const [fullName, setFullName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [preview, setPreview] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState()
    // const {data: coupon, isLoading: isCouponLoading } = useGetUserCouponQuery()
    
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {
        data: response,
        isLoading,
        isSuccess,
        isError,
        error
    } = useProfileQuery()
    
    useEffect(()=>{
        if (response){
            setCurrentProfileDetail(response)
            setFullName(response.data.full_name)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setPhone(response.data.phone)
            setPreview(response.data.profile_picture)
        }
    }, [response])


    const [toggleEdit, setToggleEdit] = React.useState(false)
    const handleFullNameInput = (e: any) => setFullName(e.target.value)
    const handleUsernameInput = (e: any) => setUsername(e.target.value)
    const handleEmailInput = (e: any) => setEmail(e.target.value)
    const handlePhoneInput = (e: any) => setPhone(e.target.value)

    const handleEdit = (e: any) => {
        e.preventDefault()
        setToggleEdit(true)
    }

    const [editProfilePicture] = useEditProfileMutation()

    useEffect(() => {
        if (!selectedFile) {
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const handleSelectFile = (e:any) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])
    }

    const handleCancel = () => {
        setToggleEdit(false)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        try {
            const data = new FormData(e.currentTarget);
            
            if (selectedFile !== undefined) {
                data.set("file", selectedFile)
            }

            try {                
                editProfilePicture(data)
                setToggleEdit(false)
            } catch (err: any) {
                toast.error(err.data.data.message)
            }
            toast.success('Profile updated')
        } catch (err: any) {
            toast.error(err.data.data.message)
        }
    }

    const content = (
        !isLoggedIn
        ? <Loader/>
        :<section className='profile'>

            <form className='content' onSubmit={handleSubmit}>
                <h1>Profile</h1>
                {/* <div className="profile">
                    <label htmlFor="file-input"><img src={preview} alt="profile"/></label>
                    <input 
                        name="img" 
                        id="file-input" 
                        type="file" 
                        style={{display: "none"}} 
                        onChange={handleSelectFile} 
                        disabled={!toggleEdit}
                        accept="image/jpg,image/jpeg,image/png"
                    />
                </div> */}

                <InputField
                    title='Full Name'
                    name='full_name'
                    type='text'
                    textInputProps={{value:fullName, isDisabled: !toggleEdit}}
                    stateHandler={handleFullNameInput}
                />
                <InputField
                    title='Username'
                    name='username'
                    type='text'
                    textInputProps={{value:username, isDisabled: !toggleEdit}}
                    stateHandler={handleUsernameInput}
                />
                <InputField
                    title='Email'
                    name='email'
                    type='text'
                    textInputProps={{value:email, isDisabled: !toggleEdit}}
                    stateHandler={handleEmailInput}
                />
                <InputField
                    title='Phone'
                    name='phone'
                    type='text'
                    textInputProps={{value:phone, isDisabled: !toggleEdit}}
                    stateHandler={handlePhoneInput}
                />
                {
                    toggleEdit
                    ? <div className="buttons">
                        <button className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                        <button className="btn btn-warning" type='submit'>Submit</button>
                    </div>
                    : <div className="buttons">
                        <button className="btn btn-outline-warning" onClick={handleEdit}>Edit</button>
                    </div>
                }
            </form>
            {/* <div className="coupons">
                <h1>My Coupons</h1>
                {
                    !isCouponLoading && coupon?.data.user_coupons &&
                    coupon.data.user_coupons.map((val, i) => {
                        return <p key={i}><GiPriceTag/> Cashback IDR {val.discount_amount.toLocaleString('id-ID')}</p>
                    })
                }
            </div> */}
        </section>
    )
    return content
}

export default Profile