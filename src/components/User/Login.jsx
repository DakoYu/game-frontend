import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShowAlert from '../../utils/ShowAlert';
import { authenticate, isAuth } from '../../utils/authHelper';
import './Login.css';

const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        error: '',
        buttonText: 'Log In'
    });

    const navigate = useNavigate();

    const inputHandler = name => e => {
        setState(prev => {
            return {...prev, [name]: e.target.value, error: ''}
        });
    }

    const loginHandler = async() => {
        try {
            const url = `${process.env.REACT_APP_API}user/login`;

            const res = await axios.post(url, {
                email: state.email,
                password: state.password
            });

            authenticate(res, () => {
                navigate('/');
            });
            
        } catch(err) {
            setState(prev => {
                return {...prev, error: err.response.data.message}
            });
        }
    }

    const submitHandler = e => {
        e.preventDefault();

        loginHandler()
    }

    useEffect(() => {
        isAuth() && navigate('/');
    }, [navigate])

    return (
        <section className='login'>
            <form onSubmit={submitHandler}>
                <h3>Log In</h3>
                {state.error && <ShowAlert status='fail' message={`❌ ${state.error}`}/>}
                <input type='email' placeholder='Email' onChange={inputHandler('email')} value={state.email} required/>
                <input type='password' placeholder='password' onChange={inputHandler('password')} value={state.password} required/>
                <button type='submit'>{state.buttonText}</button>
            </form>
        </section>
    )
}

export default Login;