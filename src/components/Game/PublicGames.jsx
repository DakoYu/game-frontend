import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import ImageSlider from './ImageSlider';
import GameCard from './GameCard';
import './PublicGames.css';

const PublicGames = () => {
    const [games, setGames] = useState([]);

    const [loading, setLoading] = useState(true);

    const gameHandler = async() => {
        try {
            const url = `${process.env.REACT_APP_API}game/`;
            const res = await axios.get(url);
            
            setGames(res.data.games);
            
            setLoading(false);
            
        } catch (err) {
            
        }
    }
    
    const gameList = games.map(e => {
        return <GameCard
            key={e._id}
            name={e.name}
            id={e._id}
        />
    });
    
    useEffect(() => {
        gameHandler();
    }, []);

    if (loading) return <ReactLoading className='loading' type={'bars'} color={'#4169E1'} height={300} width={300} />


    return (
        <>
            <ImageSlider />
            <div className='all-games'>
                {gameList}
            </div>
        </>
    )
}

export default PublicGames;