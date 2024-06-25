import React, { useState, useEffect } from 'react';
import './Banner.css'
import { useFetcher } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import GiphyList from './GiphyList';
import { useParams } from 'react-router-dom';

const Banner = ({ boards, setBoards, addBoard }) => {
    const params = useParams();
    const boardId = params.boardId
    console.log(boardId)
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const location = useLocation();
    const [text, setText] = useState('');
    const [selectedGif, setSelectedGif] = useState('');
    const [result, setResult] = useState([]);
    const [newCard,setNewCard] = useState({
      name: '',
      image: '',
    }) 
    
  const apiKey =import.meta.env.VITE_API_KEY

    const handleCategoryClick = (category) => {
      if (category === 'Recent') {
        setActiveCategory('');
        fetchBoards('Recent');
      } else{
        setActiveCategory(category === 'All' ? '': category);
        fetchBoards();
      }
    };

    const fetchBoards = async (sort = '') => {
      try {
        const url = `http://localhost:3007/Boards?category=${activeCategory}&sort=${sort}`;
        const response = await fetch(url);
        if (response.ok) {
            const boards = await response.json();
            setBoards(boards);
        } else {
            console.error('Failed to fetch boards');
        }
      } catch (error) {
          console.error('Error fetching boards:', error);
      }
    };

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
          setBoards([]);
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

    const handleGiphyInput = (event) => {
      setText(event.target.value)
    }

    const handleGiphySubmit = (event) => {
      event.preventDefault()
      const giphyApiCall = async () => {
          const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${text}&limit=10&api_key=${apiKey}`;
          const response = await fetch(apiUrl);
          const result = await response.json();
          console.log("result",result)
          const gifs = result.data.map((gif) => gif.images.original.url);
          setResult(gifs);
      };
      giphyApiCall()
      setText('')
    }
    
    const handleImageSelect = (url) => {
        setNewCard({ ...newCard, image: url });
        setSelectedGif(url);
    };

    const handleInputChange = (event) => {
      setNewCard({ ...newCard, [event.target.id]: event.target.value})

    }

    const handleCreateCard = async (boardId) => {
      console.log(boardId)
      const title = document.querySelector('#title').value;
      const image = document.querySelector('#image').value;
      const category = document.querySelector('#category').value;
      const author = document.querySelector('#author').value;
      try {
        const response = await fetch(`http://localhost:3007/Boards/${boardId}/cards`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, image, category, author }),
        });
        if (response.ok) {
          const newCard = await response.json();
          // Add the new card to the state
          setNewCard([...cards, newCard]);
          // Close the modal
          setShowModal(false);
        } else {
          console.error('Error creating card');
        }
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <div className="banner">
        <input className="search-bar" type='text' placeholder='Search boards...' value={searchQuery} onChange={handleSearch}/>
        <div className="banner-options">
                <button onClick={() => handleCategoryClick('All')}>All</button>
                <button onClick={() => handleCategoryClick('Recent')}>Recent</button>
                <button onClick={() => handleCategoryClick('Celebration')}>Celebration</button>
                <button onClick={() => handleCategoryClick('Thank You')}>Thank You</button>
                <button onClick={() => handleCategoryClick('Inspiration')}>Inspiration</button>
        </div>
        <div className="center-button-container">
          <button className='create-board' onClick={() => setShowModal(true)} style={{  display: location.pathname === "/" || location.pathname === "/Boards" ? 'flex' : 'none', marginLeft: "400px" }}>Create Board</button>
          <button className='create-card' onClick={() => setShowModal(true)} style={{  display: location.pathname.includes('cards') ? 'block' : 'none', marginLeft: "400px" }}>Create Card</button>
          {showModal && (
            <div className="overlay">
              <div className="new-board-form">
                <button className="close-btn" onClick={handleCloseIconClick}>X</button>
                <h2 style={{  display: location.pathname === "/" || location.pathname === "/Boards" ? 'grid' : 'none' }}>Create a New Board</h2>
                <h2 style={{  display: location.pathname.includes("cards") ? 'grid' : 'none' }}>Create a New Card</h2>
                <label>Title:</label>
                <input type="text" id="title" required/>
                <label style={{  display: location.pathname.includes("cards") ? 'grid' : 'none' }}>Search Image:</label>
                <input type="text" id="image" required style={{  display: location.pathname.includes("cards") ? 'flex' : 'none' }} onChange={handleGiphyInput}/>
                <button id="image-search" type="button" style={{  display: location.pathname.includes("cards") ? 'flex' : 'none' }} onClick={handleGiphySubmit}>search</button>
                {result && <GiphyList gifs={result} onSelect={handleImageSelect}/>}
                <input type='text' id='selected-gif' value={selectedGif} readOnly onChange={handleInputChange} />               
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
                {location.pathname.includes("cards") ? (
                  <button className="submit" onClick={() => handleCreateCard(boardId)}>Create Card</button>
                ) : (
                  <button className="submit" onClick={() => handleCreateBoard()}>Create Board</button>
                )}
                
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

export default Banner


