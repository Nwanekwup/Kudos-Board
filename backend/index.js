const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json())

const { validateBody } = require('./middleware');

//Defining routes for boards
app.get('/Boards', validateBody, async (req, res) => {
    try{
        const boards = await prisma.board.findMany()
        res.status(200).json(boards);
    }   catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error retrieving boards'})
    }
    
});
// route to get a specific board 

app.get('/Boards/:id', validateBody, async (req, res) => {
    try {
      const { id } = req.params;
      const board = await prisma.board.findUnique({ where: { id: parseInt(id) } });
      res.status(200).json(board);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Board not found' });
    }
});

// route to create a new board
app.post('/Boards', async (req, res) => {
    try {
      const { title, category, author } = req.body;
      const newBoard = await prisma.board.create({ data: { title, category, author } });
      res.status(200).json(newBoard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating board' });
    }
});

// route to update a board
app.put('/Boards/:id', validateBody, async (req, res) => {
    
    try{
        const { id }= req.params
        const { title, category, author } = req.body
        const board = await prisma.board.findUnique({where: { id: parseInt(id)}})
        // check if the board exists
        if (!board) {
            res.status(404).json({ message: 'Board not found' })
            return
        }
        // else, update the board
        const updatedBoard = await prisma.board.update({
            where: { id: parseInt(id) },
            data: {
                title,
                category,
                author
            }
        });
        res.status(200).json(updatedBoard);
    }   catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error updating board'})
    }  
});

// route to delete a board
app.delete('/Boards/:id', validateBody, async (req, res) => {
    const { id } = req.params
    try {
      await prisma.board.delete({ where: { id: parseInt(id) } })
      res.status(200).json({ message: 'Board deleted successfully' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Error deleting board' })
    }
})

// Defining routes for cards

// POST /cards: Creates a new card and associates it with a board using the boardId field
app.post('/Cards', validateBody, async (req, res) => {
    try {
      const { title, description, imgurl, author, upvotes, boardId } = req.body;
      const newCard = await prisma.card.create({
        data: {
          title,
          description,
          imgurl,
          author,
          upvotes,
          boardId: parseInt(boardId),
        },
      });
      res.status(200).json(newCard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating card' });
    }
});

// PUT /cards/:id: Updates a single card by ID
app.put('/Cards/:id', validateBody, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, imgurl, author, upvotes } = req.body;
      const card = await prisma.card.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          imgurl,
          author,
          upvotes,
        },
      });
      res.status(200).json(card);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Card not found' });
    }
});

// DELETE /cards/:id: Deletes a single card by ID
app.delete('/Cards/:id', validateBody, async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.card.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Card not found' });
    }
});




const PORT = process.env.PORT || 3007;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})