import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import ReactLoading from 'react-loading';
import DisplayGame from './DisplayGame';
import './Games.css';

const Games = () => {
    const [games, setGames] = useState([]);

    const [loading, setLoading] = useState(true);

    const gameHandler = async() => {
        try {
            const url = `${process.env.REACT_APP_API}game/`;
            const res = await axios.get(url);
            
            setGames(res.data.games);
        } catch (err) {

        }
    }

    const deleteGame = useCallback(id => {
        const newGames = games.filter(e => {
            return e._id !== id
        });

        setGames(newGames)
    }, [games]);

    useEffect(() => {
        gameHandler();
        setLoading(false);
    }, []);

    if (loading) return <ReactLoading className='loading' type={'bars'} color={'#4169E1'} height={300} width={300} />

    const gameList = games.map(e => {
        return <DisplayGame 
            key={e._id}
            name={e.name}
            year={e.year}
            id={e._id}
            price={e.price}
            deleteGame={deleteGame}
        />
    })

    return (
        <div className='games-delete'>
            <h3>list of games</h3>
            {gameList}
        </div>
    )
}

export default Games;