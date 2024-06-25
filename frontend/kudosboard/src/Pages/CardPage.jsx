import Banner from "../components/Banner"
import Header from "../components/Header"
import Footer from "../components/Footer"
import KudoCard from "../components/KudoCard"
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const CardPage = () => {
    const { boardId } = useParams();
    const [cards, setCards] = useState([]);

    const addCard = (newCard) => {
        const updatedCards = [...cards, newCard];
        setCards(updatedCards);
    };
    return (
        <div>
            <Header />
            <Banner addCard={addCard} cards={cards} setCards={setCards}/>
            <KudoCard boardId={boardId} cards={cards} setCards={setCards}/>
            <Footer />
        </div>
    )
}

export default CardPage