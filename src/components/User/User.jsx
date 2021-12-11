import './User.css';

const User = props => {
    const { id, name, email, roles } = props;

    return (
        <div className='user-display'>
            <div className='info'>
                <img src={`${process.env.REACT_APP_API}user/image/${id}`} alt='user'/>
                <h4>{name}</h4>
            </div>
            <p>{email}</p>
            <p>{roles}</p>
        </div>
    )
}

export default User;