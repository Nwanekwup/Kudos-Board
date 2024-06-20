import { useEffect, useState } from 'react';
import './kudoBoard.css';

const KudoBoard = () => {
    const [boards, setBoards] = useState([]);
    useEffect(() => {
        const fetchBoards = async () => {
            try {
            const response = await fetch('http://localhost:3007/Boards'); 
            const data = await response.json();
            setBoards(data);
            console.log(boards);
            } catch (error) {
            console.error(error);
            }
        };
        fetchBoards();
        console.log(fetchBoards)
      }, [])
    return(
        <div className="kudo-board">
            {boards.map((board) => (
            <div key={board.id} className="board-details">
                <img className='board-image' src='https://picsum.photos/200/300'/>
                <div className="board-title">
                    <h3>{board.title}</h3>
                </div>
                <div className="board-category">
                    <p>{board.category}</p>
                </div>
                <div className="board-buttons">
                    <button className='view-board'>View Board</button>
                    <button className='delete-board'>Delete Board</button>
                </div>
            </div>
            ))}
        </div>
    )
}

export default KudoBoard 

