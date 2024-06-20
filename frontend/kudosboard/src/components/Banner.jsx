import React, { useState } from 'react';
import './Banner.css'

const Banner = (props) => {
    const [showModal, setShowModal] = useState(false);
    const handleCreateBoardClick = () => {
        setShowModal(true);
    };
    const handleCloseIconClick = () => {
        setShowModal(false);
    };
    return(
    <div className="banner">
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
                        <button className="close-btn" onClick={() => setShowModal(false)}>X</button>
                        <h2>Create a New Board</h2>
                        <label>Title:</label>
                        <input type="text" required/>
                        <label>Category:</label>
                        <select required>
                            <option value>Select a category</option>
                            <option value="Recent">Recent</option>            
                            <option value="Celebration">Celebration</option>
                            <option value="Thank You">Thank You</option>
                            <option value="Inspiration">Inspiration</option>
                        </select>
                        <label>Author:</label>
                        <input type="text"/>
                        <button className="submit" onClick={() => setShowModal(false)}>Create Board</button>
                    </div>
                </div>
                
            )
            }

        </div>
    </div>
    );
};

export default Banner

{/* // <div className="modal"> */}
                {/* //     <div className="modal-content">
                //         <span className='close-icon' onClick={handleCloseIconClick}>
                //             &times;
                //         </span>
                //         <h2>Create a New Board</h2>
                //         <label>
                //             Title:
                //             <input name='title' onChange={(event) => setTitle(event.target.value)} />
                //         </label>
                //         <label>
                //             Category:
                //             <input name='category' onChange={(event) => setCategory(event.target.value)} />
                //         </label>
                //         <label>
                //             Author:
                //             <input name='author' onChange={(event) => setAuthor(event.target.value)} />
                //         </label>
                //         <button onClick={handleCreateBoardClick}>Create</button>
                //      </div> */}

                {/* // </div> */}
