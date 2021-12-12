import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie } from './utils/authHelper';
import { isAuth, logout } from './utils/authHelper';
import './Navbar.css';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [state, setState] = useState({
        name: '',
        img: '',
        loading: true
    });

    const navigate = useNavigate();

    const logoutHandler = () => {
        logout();
        navigate('/');
        window.location.reload(false);
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
                    name: res.data.user.name, 
                    img: res.data.user._id, 
                    loading: false
                }
            });

        } catch (err) {
            console.log(err.response.data.message);
        }
    }

    useEffect(() => {
        isAuth() && userHandler();
    }, [])

    return (
        <header>
            <nav className='navbar'>
                <ul>
                    <Link className='nav-link' to='/'>Games</Link>
                    {!isAuth() && <Link className='nav-link' to='/login'>Log In</Link>}
                    {!isAuth() && <Link className='nav-link' to='/register'>Register</Link>}
                    {isAuth() && <Link className='nav-link' to='/mygames'>My Games</Link>}
                    {isAuth() && <Link className='nav-link' to='/profile'>Profile</Link>}
                    {isAuth() && <li className='nav-link' onClick={logoutHandler}>Log Out</li>}
                </ul>
                {!state.loading &&
                    <div className='info'>
                        <img src={`${process.env.REACT_APP_API}user/image/${state.img}`} alt='avatar'/>
                        <p>{state.name}</p>
                    </div>
                }
            </nav>
        </header>
    )
}

export default Navbar;