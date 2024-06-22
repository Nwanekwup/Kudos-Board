import { useEffect, useState } from 'react';
import './kudoBoard.css';
import { useNavigate } from 'react-router-dom'

const KudoBoard = ({ boards, setBoards }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const fetchBoards = async () => {
            try {
            const response = await fetch('http://localhost:3007/Boards'); 
            const data = await response.json();
            setBoards(data);
            } catch (error) {
            console.error(error);
            }
        };
        fetchBoards();
    }, [])

    const handleDelete = async (boardId) => {
        try {
          const response = await fetch(`http://localhost:3007/Boards/${boardId}`, {
            method: 'DELETE',
          })
      
          if (response.ok) {
            const data = await response.json()
            setBoards(boards.filter(board => board.id !== boardId))
            navigate('/Boards')
          } else {
            console.error('Error deleting board:', response.statusText)
          }
        } catch (error) {
          console.error('Error deleting board:', error)
        }
      }

    return(
        <div className='kudo-boards'>
        {boards.map((board) => (
            <div key={board.id} className="kudo-board">
                <div className="board-details">
                    <img className='board-image' src='https://picsum.photos/200/300'/>
                    <div className="board-title">
                        <h3>{board.title}</h3>
                    </div>
                    <div className="board-category">
                        <p>{board.category}</p>
                    </div>
                    <div className="board-author">
                        <p>{board.author}</p>
                    </div>
                    <div className="board-buttons">
                        <button className='view-board' onClick={() => { navigate(`/boards/${board.id}/cards`)}}>View Board</button>
                        <button className='delete-board' onClick={() => handleDelete(board.id)}>Delete Board</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
    )
}

export default KudoBoard 

