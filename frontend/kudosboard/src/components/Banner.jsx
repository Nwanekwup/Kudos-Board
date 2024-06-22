import React, { useState } from 'react';
import './Banner.css'

const Banner = ({ boards, setBoards, addBoard }) => {
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const handleCreateBoardClick = () => {
      setShowModal(true);
    };
    const handleCloseIconClick = () => {
      setShowModal(false);
    };
    const handleCreateBoard = async () => {
      const title = document.querySelector('#title').value;
      const category = document.querySelector('#category').value;
      const author = document.querySelector('#author').value;
      try {
        const response = await fetch('http://www.localhost:3007/Boards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, category, author }),
        });
        if (response.ok) {
          const newBoard = await response.json();
          addBoard(newBoard);
          setShowModal(false); // Close the modal after creating a new board
        } else {
          console.error('Error creating board');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleSearch = async (event) => {
        const searchQuery = event.target.value;
        // event.target.value = searchQuery;
        setSearchQuery(searchQuery);
        try {
            const response = await fetch(`http://localhost:3007/Boards/search/${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(" print my word: ",response)
            if (response.ok) {
                const boards = await response.json();
                setBoards(boards);
            } else {
                console.error('Failed to fetch boards');
            }
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    }

    return (
      <div className="banner">
        <input className="search-bar" type='text' placeholder='Search boards...' value={searchQuery} onChange={handleSearch}/>
        <div className="banner-options">
          <button className='all'>All</button>
          <button className='all'>Recent</button>
          <button className='all'>Celebration</button>
          <button className='all'>Thank You</button>
          <button className='all'>Inspiration</button>
        </div>
        <div className="center-button-container">
          <button className='create-board' onClick={() => setShowModal(true)}>Create Board</button>
          {showModal && (
            <div className="overlay">
              <div className="new-board-form">
                <button className="close-btn" onClick={handleCloseIconClick}>X</button>
                <h2>Create a New Board</h2>
                <label>Title:</label>
                <input type="text" id="title" required/>
                <label>Category:</label>
                <select id="category" required>
                  <option value>Select a category</option>
                  <option value="Recent">Recent</option>
                  <option value="Celebration">Celebration</option>
                  <option value="Thank You">Thank You</option>
                  <option value="Inspiration">Inspiration</option>
                </select>
                <label>Author:</label>
                <input type="text" id="author"/>
                <button className="submit" onClick={handleCreateBoard}>Create Board</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

export default Banner


