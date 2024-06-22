import React, { useEffect, useState } from 'react';
import './kudoCard.css';

const KudoCard = ({ boardId }) => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchCards = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3007/boards/${boardId}/cards`);
            if (response.ok) {
                const data = await response.json();
                setCards(data);
            } else {
                throw new Error('Failed to fetch cards');
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (boardId) {
            fetchCards();
        }
    }, [boardId]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleDelete = async (cardId) => {
        try {
            const response = await fetch(`http://localhost:3007/boards/${boardId}/cards/${cardId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setCards(currentCards => currentCards.filter(card => card.id !== cardId));
            } else {
                console.error('Failed to delete card:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    return (
        <div className="kudo-cards">
            {cards.map(card => (
                <div key={card.id}>
                    <div className="card-image">
                        <img src={card.imgurl || 'https://picsum.photos/200/300'} alt={card.title} />
                    </div>
                    <div className="card-title">
                        <h3>{card.title}</h3>
                    </div>
                    <div className="card-description">
                        <p>{card.description}</p>
                    </div>
                    <div className="card-author">
                        <h3>{card.author}</h3>
                    </div>
                    <div className="card-buttons">
                        <button className='upvotes'>Upvotes: {card.upvotes}</button>
                        <button className='delete-card' onClick={() => handleDelete(card.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default KudoCard;