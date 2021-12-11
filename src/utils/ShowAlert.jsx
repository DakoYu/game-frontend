import './ShowAlert.css';

const ShowAlert = ({status, message}) => {
    return (
        <div className={`alert alert-${status}`}>{message}</div>
    )
}

export default ShowAlert;