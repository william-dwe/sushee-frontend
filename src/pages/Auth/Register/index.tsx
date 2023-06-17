import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../../../features/authSlice/authApiSlice';
import './index.scss'
import InputField from '../../../components/InputField';
import Loader from '../../../components/Loader';
import Button from '../../../components/Button';
import { IRes } from '../../../entity';


export default function Register():JSX.Element {
    const [full_name, setFullName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [register, {error}] = useRegisterMutation()


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
          await register({full_name, email, phone, username, password}).unwrap()
          setFullName('')
          setUsername('')
          setEmail('')
          setPassword('')
          toast.success('Register succeed')
          navigate('/login')
        } catch (err: any) {
            toast.error(err.data.message)
        }
    }

    const handleFullNameInput = (e: any) => setFullName(e.target.value)
    const handleUsernameInput = (e: any) => setUsername(e.target.value)
    const handlePhoneInput = (e: any) => setPhone(e.target.value)
    const handleEmailInput = (e: any) => setEmail(e.target.value)
    const handlePasswordInput = (e: any) => setPassword(e.target.value)

    const content =  !register && !error ? <Loader/> : (
    <section className='register'>
        <div className="content" >
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <InputField
                    title='Full Name'
                    name='full_name'
                    type='text'
                    textInputProps={{placeholder: 'tatang sutarma'}}
                    stateHandler={handleFullNameInput}
                />
                <InputField
                    title='Username'
                    name='username'
                    type='text'
                    textInputProps={{placeholder: 'tatangs123'}}
                    stateHandler={handleUsernameInput}
                />
                <InputField
                    title='Phone'
                    name='phone'
                    type='text'
                    textInputProps={{placeholder: '054375834'}}
                    stateHandler={handlePhoneInput}
                />
                <InputField
                    title='Email'
                    name='email'
                    type='text'
                    textInputProps={{placeholder: 'tatangs@mail.com'}}
                    stateHandler={handleEmailInput}
                />
                <InputField
                    title='Password'
                    name='password'
                    type='password'
                    textInputProps={{placeholder: '*********'}}
                    stateHandler={handlePasswordInput}
                />
                <Button text='Register'/>
            </form>
        </div>
    </section>
    )

    return content
}