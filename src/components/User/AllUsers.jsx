import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import User from './User';
import { getCookie } from '../../utils/authHelper';

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
    }, []);

    
    if (loading) return <ReactLoading className='loading' type={'bars'} color={'#4169E1'} height={300} width={300} />
    
    const userList = users.map(e => {
        return <User 
            id={e._id}
            name={e.name}
            email={e.email} 
            roles={e.roles}
        />
    })
    return (
        <div>
            {userList}
        </div>
    )
}

export default AllUsers;