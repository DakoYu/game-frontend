import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';
import { getCookie } from '../../utils/authHelper';
import './Game.css';

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

const Game = props => {
    const { name, price, id, _id, deleteGame } = props;

    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const deleteHandler = async() => {
        try {
            const token = getCookie('token');

            const url = `${process.env.REACT_APP_API}mygame/${_id}`;

            await axios.delete(url,
                {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            deleteGame(_id);

            closeModal();

        } catch(err) {
            console.log(err.response.data.message)
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
            <div className='games-db'>
                <img src={`${process.env.REACT_APP_API}game/image/${id}`} alt='game'/>
                <div className='games-info'>
                    <h2>{name}</h2>
                    <p>${price}</p>
                    <button onClick={openModal}><i className="uil uil-trash-alt"></i> Remove</button>
                </div>
            </div>
        </>
    );
}

export default Game;