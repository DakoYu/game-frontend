import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
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

            console.log(res.data.user)
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

    return (
        <div>

        </div>
    )
}

export default AllUsers;