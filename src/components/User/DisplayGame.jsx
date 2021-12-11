import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { getCookie } from '../../utils/authHelper';
import './DisplayGame.css';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)',
    },
  };

const DisplayGame = props => {
    const { id, name, deleteGame } = props;

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }


    const year = props.year || 'N/A';

    const price = props.price|| 'N/A';

    const deleteHandler = async () => {
        try {
            const token = getCookie('token');

            const url = (`${process.env.REACT_APP_API}game/delete/${id}`);

            await axios.delete(url, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            deleteGame(id);

            closeModal();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>Are you sure you want to delete {name}?</h2>
                <div className='choice'>
                    <button className='yes' onClick={deleteHandler}>yes</button>
                    <button className='no' onClick={closeModal}>no</button>
                </div>
            </Modal>

            <div className='game-item'>
                <img src={`${process.env.REACT_APP_API}game/image/${id}`} alt='game'/>
                <h3>{name}</h3>
                <p>Year: {year}</p>
                <p>{`$${price}`}</p>
                <button onClick={openModal}><i className="uil uil-times-square"></i></button>
            </div>
        </>
    )
}

export default DisplayGame;