import axios from 'axios';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/authHelper';
import ShowAlert from '../../utils/ShowAlert';
import './ProfileSettings.css';

const ProfileSettings = () => {
    const [state, setState] = useState({
        loading: true,
        name: '',
        email: '',
        img: '',
        success: null,
        buttonText: 'update'
    });

    const [imgFile, setImgFile] = useState(null);

    const inputHandler = name => e => {
        setState(prev => {
            return {...prev, [name]: e.target.value}
        })
    }

    const uploadFile = e => {
        setImgFile(e.target.files[0]);
    }

    const userHandler = async () => {
        try {
            const token = getCookie('token');

            const url = (`${process.env.REACT_APP_API}user/getme`);

            const res = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            
            setState(prev => {
                return {
                    ...prev, 
                    name: res.data.user.name, 
                    email: res.data.user.email, 
                    img: res.data.user._id, 
                    loading: false
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const updateTimer = setTimeout(() => {
        setState(prev => {
            return {...prev, success: null}
        });
        clearTimeout(this);
    }, 6000);

    const submitUpdate = async() => {
        try {
            const token = getCookie('token');

            const url = (`${process.env.REACT_APP_API}user/updateme`);

            const formData = new FormData();

            formData.append('name', state.name);

            if (imgFile) formData.append('photo', imgFile);

            await axios.patch(url, 
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                }
            });

            setState(prev => {
                return {...prev, buttonText: 'update', success: true}
            });

            updateTimer();
        } catch(err) {

        }
    }

    const submitHandler = e => {
        e.preventDefault();

        setState(prev => {
            return {...prev, buttonText: 'updating'}
        });

        submitUpdate();
    }

    useEffect(() => {
        userHandler();
    }, []);

    if (state.loading) return <ReactLoading className='loading' type={'bars'} color={'#4169E1'} height={300} width={300} />

    return (
        <form className='settings' onSubmit={submitHandler}>
            {state.success && <ShowAlert status={'success'} message={'✅ Successfully updated'}/>}
            <p>Name</p>
            <input type='text' value={state.name} onChange={inputHandler('name')} required/>
            <p>Email</p>
            <input type='email' value={state.email} disabled/>
            <p>Profile Picture</p>
            <div className='img-container'>
                <img className='user-img' src={`${process.env.REACT_APP_API}user/image/${state.img}`} alt='user-img'/>
                <input className='photo' type="file" id='photo' name='photo' accept='image/*' onChange={uploadFile}/>
            </div>
            <button type='submit'>{state.buttonText}</button>
        </form>
    )
}

export default ProfileSettings;