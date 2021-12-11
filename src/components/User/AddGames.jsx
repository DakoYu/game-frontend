import { useState } from 'react';
import axios from 'axios';
import { getCookie } from '../../utils/authHelper';
import ShowAlert from '../../utils/ShowAlert';
import './AddGames.css';

const AddGames = () => {
    const [state, setState] = useState({
        name: '',
        year: '',
        price: '',
        buttonText: 'add',
        success: null,
        error: ''
    });

    const [imgFile, setImgFile] = useState(null);

    const inputHandler = name => e => {
        setState(prev => {
            return {...prev, [name]: e.target.value}
        })
    }

    const uploadFile = e => {
        setImgFile(e.target.files[0]);
    }

    const addNewGame = async() => {
        try {
            const token = getCookie('token');

            const url = (`${process.env.REACT_APP_API}game/create`);

            const formData = new FormData();

            formData.append('name', state.name);
            formData.append('year', state.year);
            formData.append('price', state.price);

            if (imgFile) formData.append('photo', imgFile);

            await axios.post(url, 
                formData,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                }
            });

            setState(prev => {
                return {...prev, buttonText: 'add', error: '', success: true}
            });

        } catch(err) {
            setState(prev => {
                return {...prev, buttonText: 'add', error: err.response.data.message}
            });
        }
    }

    const submitHandler = e => {
        e.preventDefault();

        setState(prev => {
            return {...prev, buttonText: 'adding'}
        });

        addNewGame();
    }

    return (
        <form className='add-game' onSubmit={submitHandler}>
            {state.success && <ShowAlert status='success' message='Successfully Added!'/>}
            {state.error && <ShowAlert status='fail' message={state.error}/>}
            <p>Name</p>
            <input type='text' value={state.name} onChange={inputHandler('name')} required/>
            <p>Year</p>
            <input type='number' value={state.year} onChange={inputHandler('year')} required/>
            <p>price</p>
            <input type='number' value={state.price} onChange={inputHandler('price')} required/>
            <p>Image</p>
            <input className='photo' type="file" id='photo' name='photo' accept='image/*' onChange={uploadFile}/>
            <button>{state.buttonText}</button>
        </form>
    )
}

export default AddGames;