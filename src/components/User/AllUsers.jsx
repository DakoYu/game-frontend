import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { getCookie } from '../../utils/authHelper';
import User from './User';
import './AllUsers.css';

const AllUsers = () => {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const getAllUsers = async() => {
        try {
            const token = getCookie('token');

            const url = `${process.env.REACT_APP_API}user/all`;

            const res = await axios.get(url, {
                headers: {
                        authorization: `Bearer ${token}`
                }
            });
            
            setUsers(res.data.user);

            setLoading(false);
        } catch (err) {
            console.log(err.response.data.message)
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    if (loading) return <ReactLoading className='loading' type={'bars'} color={'#4169E1'} height={300} width={300} />

    const usersList = users.map(e => {
        return <User 
            key={e._id}
            id={e._id}
            name={e.name}
            email={e.email}
            roles={e.roles}
        />
    })

    return (
        <div>
            <h3>Users</h3>
            <div className='users'>
                <div className='header'>
                    <h4>Name</h4>
                    <h4>Email</h4>
                    <h4>Roles</h4>
                </div>
                {usersList}
            </div>
        </div>
    )
}

export default AllUsers;