import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { getCookie, isAuth } from '../../utils/authHelper';
import Game from './Game';
import './MyGame.css';

const MyGame = () => {  
    const [loading, setLoading] = useState(true);

    const [games, setGames] = useState([]);

    const navigate = useNavigate();

    const deleteGame = useCallback(id => {
        const newGames = games.filter(e => {
            return e._id !== id
        });

        setGames(newGames)
    }, [games]);

    const getGames = async() => {
        try {
            const token = getCookie('token');

            const url = `${process.env.REACT_APP_API}mygame`;

            const res = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            setGames(res.data.mygame);

            setLoading(false);

        } catch (err) {

        }
    }

    useEffect(() => {
        !isAuth() && navigate('/');
        
        getGames();
    }, [navigate]);

    if (loading) return <ReactLoading className='loading' type={'bars'} color={'#4169E1'} height={300} width={300} />

    const gamesList = games.map(e => {
        return <Game
            key={e._id}
            name={e.game.name}
            _id={e._id}
            id={e.game._id}
            price={e.game.price}
            deleteGame={deleteGame}
        />
    })

    return (
        <div className='mygames'>
            {gamesList}
        </div>
    )
}

export default MyGame;