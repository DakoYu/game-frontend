import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';
import { getCookie, isAuth } from '../../utils/authHelper';
import ShowAlert from '../../utils/ShowAlert';
import './GameCard.css';

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

const GameCard = props => {
    const { name, id } = props;

    const [modalIsOpen, setIsOpen] = useState(false);

    const [already, setAlready] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const addGameHandler = async() => {
        try {
            const token = getCookie('token');

            const url = `${process.env.REACT_APP_API}mygame`;

            await axios.post(url, {
                game: id
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            closeModal();
        } catch (err) {
            setAlready(true);
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
                    {already && <ShowAlert status='fail' message={`${name} is already in your collections`}/>}
                    <h2>Do you want to add {name} to your collections?</h2>
                    <div className='choice'>
                        <button className='no' onClick={addGameHandler}>yes</button>
                        <button className='yes' onClick={closeModal}>no</button>
                    </div>
            </Modal>
            <div className='game-card'>
                <img src={`${process.env.REACT_APP_API}game/image/${id}`} alt='game'/>
                <h1>{name} {isAuth() && <i className="uil uil-book-medical" onClick={openModal}></i>}</h1>
            </div>
        </>
    )
}

export default GameCard;