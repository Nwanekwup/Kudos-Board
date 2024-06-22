import React, { useState } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import KudoBoard from '../components/KudoBoard';
import Footer from '../components/Footer';
import '../App.css';
import KudoCard from '../components/KudoCard';


const HomePage = () => {
    const [boards, setBoards] = useState([]);
    const addBoard = (newBoard) => {
        const updatedBoards = [...boards, newBoard];
        setBoards(updatedBoards);
    };

    return (
        <div className='app-body'>
        <Header />
        <Banner addBoard={addBoard} boards={boards} setBoards={setBoards} />
        <KudoBoard boards={boards} setBoards={setBoards} />
        <KudoCard />
        <Footer />
        
        </div>
        
    )
}

export default HomePage