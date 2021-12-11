import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ShowAlert from '../../utils/ShowAlert';
import { authenticate, isAuth } from '../../utils/authHelper';
import './Register.css';

const Register = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
        error: '',
        buttonText: 'Register'
    });

    const navigate = useNavigate();

    const inputHandler = name => e => {
        setState(prev => {
            return {...prev, [name]: e.target.value, error: ''}
        });
    }

    const loginHandler = async() => {
        try {
            const url = `${process.env.REACT_APP_API}user/register`;

            const res = await axios.post(url, {
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirm: state.passwordConfirm
            });

            authenticate(res, () => {
                navigate('/');
            });

        } catch(err) {
            setState(prev => {
                return {...prev, error: err.response.data.message, buttonText: 'Register'}
            });
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        setState(prev => {
            return {...prev, buttonText: 'Registering', error: ''}
        });
        loginHandler()
    }

    useEffect(() => {
        isAuth() && navigate('/');
    }, [navigate])

    return (
        <section className='register'>
            <form onSubmit={submitHandler}>
                <h3>Register</h3>
                {state.error && <ShowAlert status='fail' message={`❌ ${state.error}`}/>}
                <input type='text' placeholder='Name' onChange={inputHandler('name')} value={state.name} required/>
                <input type='email' placeholder='Email' onChange={inputHandler('email')} value={state.email} required/>
                <input type='password' placeholder='password' onChange={inputHandler('password')} value={state.password} required/>
                <input type='password' placeholder='password' onChange={inputHandler('passwordConfirm')} value={state.passwordConfirm} required/>
                <button type='submit'>{state.buttonText}</button>
            </form>
        </section>
    )
}

export default Register;