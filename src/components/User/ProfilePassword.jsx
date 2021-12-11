import { useState } from 'react';
import axios from 'axios';
import ShowAlert from '../../utils/ShowAlert';
import './ProfilePassword.css';
import { authenticate, getCookie } from '../../utils/authHelper';

const ProfilePassword = () => {
    const [state, setState] = useState({
        curPassword: '',
        newPassword: '',
        confirmPassword: '',
        buttonText: 'update',
        success: null,
        error: ''
    });

    const inputHandler = name => e => {
        setState(prev => {
            return {
                ...prev,
                [name]: e.target.value,
                buttonText: 'update',
                success: ''
            }
        })
    }

    const updateHandler = async() => {
        try {
            const token = getCookie('token');

            const url = `${process.env.REACT_APP_API}user/resetpassword`;

            const res = await axios.patch(url, {
                currentPassword: state.curPassword,
                newPassword: state.newPassword,
                passwordConfirm: state.confirmPassword
            }, 
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            authenticate(res, () => {
                setState(prev => {
                    return {
                        ...prev,
                        curPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                        buttonText: 'update',
                        success: true,
                        error: ''
                    }
                })
            })

        } catch (err) {
            setState(prev => {
                return {
                    ...prev,
                    buttonText: 'update',
                    success: '',
                    error: err.response.data.message
                }
            })
        }
    }

    const submitHandler = e => {
        e.preventDefault();

        setState(prev => {
            return {
                ...prev,
                buttonText: 'updating',
            }
        });

        updateHandler();
    }

    return (
        <form className='password' onSubmit={submitHandler}> 
            {state.success && <ShowAlert status={'success'} message={'✅ Successfully updated'}/>}
            {state.error && <ShowAlert status={'fail'} message={`❌ ${state.error}`}/>}
            <p>Current Password</p>
            <input type='password' value={state.curPassword} onChange={inputHandler('curPassword')} required/>
            <p>New Password</p>
            <input type='password' value={state.newPassword} onChange={inputHandler('newPassword')} required/>
            <p>Confirm New Password</p>
            <input type='password' value={state.confirmPassword} onChange={inputHandler('confirmPassword')} required/>
            <button>{state.buttonText}</button>
        </form>
    )
}

export default ProfilePassword;