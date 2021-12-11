import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCookie, isAuth } from '../../utils/authHelper';
import ProfileSettings from './ProfileSettings';
import ProfilePassword from './ProfilePassword';
import Games from './Games';
import AddGames from './AddGames';
import AllUsers from './AllUsers';
import './Profile.css';

const Profile = () => {
    const [state, setState] = useState({
        setting: true,
        password: false,
        admin: false,
        add: false,
        delete: false,
    });

    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        !isAuth() && navigate('/');
    });

    const clickHandler = name => e => {
        setState(prev => {
            const filtered = Object.assign(...Object.keys(state).map(e => {
                if (e === name) {
                    return { [name]: true }
                }

                return { [e]: false }
            }))

            return filtered
        })
    }

    const roleHandler = async() => {
        try {
            const token = getCookie('token');

            const url = `${process.env.REACT_APP_API}user/getme`;

            const res = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (res.data.user.roles === 'admin') {
                setIsAdmin(true);
            }
        } catch (err) {
            
        }
    }

    useEffect(() => {
        roleHandler();
    }, [state])

    return (
        <section className='profile'>
            <div className='nav-list'>
                <ul>
                    <li className={`nav-item ${state.setting ?'active' : ''}`} onClick={clickHandler('setting')}><i className="uil uil-user"></i> settings</li>
                    <li className={`nav-item ${state.password ?'active' : ''}`} onClick={clickHandler('password')}><i className="uil uil-key-skeleton"></i> reset password</li>
                </ul>
                {isAdmin &&
                    <ul className='admins'>
                        <li className={`nav-item ${state.admin ?'active' : ''}`} onClick={clickHandler('admin')}><i className="uil uil-airplay"></i> admin portals</li>
                        <li className={`nav-item ${state.add ?'active' : ''}`} onClick={clickHandler('add')}><i className="uil uil-plus-circle"></i> add games</li>
                        <li className={`nav-item ${state.delete ?'active' : ''}`} onClick={clickHandler('delete')}><i className="uil uil-trash-alt"></i> delete games</li>
                    </ul>
                }
            </div>
            <div className='content'>
                {state.setting && <ProfileSettings />}
                {state.password && <ProfilePassword />}
                {state.admin && <AllUsers />}
                {state.delete && <Games />}
                {state.add && <AddGames />}
            </div>
        </section>
    )
}

export default Profile;