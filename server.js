const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const Book = require('./models/book');

//We will initialize the app
const app = express();

//We will connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error('MongoDB connection error:', err));


// CREATE operation 
app.post('./book', async(req, res) => {
    try {
        const { title, author, genre, publishedDate } = req.body;
        const book = new Book({ title, author, genre, publishedDate });
        await book.save();
        res.status(201).json({ message: 'Book created', book });
    } catch (err) {
        res.status(500).json({ message: 'Error in creating book !!', error: err.message });
    }
});


// UPDATE operation
app.put('/books/:id', async (req, res) => {
    try {
        const { title, author, genre, publishedDate, status } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, genre, publishedDate, status }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated', updatedBook });
    } catch (err) {
        res.status(500).json({ message: 'Error updating book', error: err.message });
    }
});


//READ operation
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books', error: err.message });
    }
});

// DELETE operation
app.delete('./book', async(req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting book', error: err.message });
    }
});


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/* 

echo "# lpw-task" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/armindgreat/lpw-task.git
git push -u origin main

*/
