import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { setIsLoggedIn, setUser } from '../../../features/authSlice';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../../../features/authSlice/authApiSlice';
import './index.scss'
import InputField from '../../../components/InputField';
import Loader from '../../../components/Loader';
import Button from '../../../components/Button';

export default function Login():JSX.Element {
    const [identifier, setIdentifier] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [login, { error }] = useLoginMutation()

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            const userData = await login({identifier, password}).unwrap()
            dispatch(setUser({...userData}))
            dispatch(setIsLoggedIn(true))
            setIdentifier('')
            setPassword('')
            toast.success('Login succeed')
            navigate(location.state?location.state.from.pathname:"/")   
        } catch (err: any) {
            toast.error(err.data.data.message)
        }
    }

    const handleIdentifierInput = (e: any) => setIdentifier(e.target.value)
    const handlePasswordInput = (e: any) => setPassword(e.target.value)

    const content = !login && !error  ? <Loader/> : (
        <section className='login'>
            <div className='content'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <InputField
                        title='Identifier'
                        name='identifier'
                        type='text'
                        textInputProps={{placeholder:'username/email'}}
                        stateHandler={handleIdentifierInput}
                    />
                    <InputField
                        title='Password'
                        name='password'
                        type='password'
                        textInputProps={{placeholder:'*******'}}
                        stateHandler={handlePasswordInput}
                    />
                    <Button text='Login'/>
                </form>
            </div>
        </section>
    )
    return content
}