const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/Book');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Home route (Read)
app.get('/', async (req, res) => {
  const books = await Book.find();
  res.render('index', { books });
});

// Add book form
app.get('/add', (req, res) => {
  res.render('add');
});

// Add book logic
app.post('/add', async (req, res) => {
  const { id, title, author, published_on, genre, rating } = req.body;
  const book = new Book({ id, title, author, published_on, genre, rating });
  await book.save();
  res.redirect('/');
});

// Edit book form
app.get('/edit/:id', async (req, res) => {
  const book = await Book.findOne({ id: req.params.id });
  res.render('edit', { book });
});

// Edit book logic
app.post('/edit/:id', async (req, res) => {
  const { title, author, published_on, genre, rating } = req.body;
  await Book.findOneAndUpdate(
    { id: req.params.id },
    { title, author, published_on, genre, rating }
  );
  res.redirect('/');
});

// Delete book
app.get('/delete/:id', async (req, res) => {
  await Book.findOneAndDelete({ id: req.params.id });
  res.redirect('/');
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
