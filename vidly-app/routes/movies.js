const { Movie, validate } = require('../models/movie');
const { Genre } = require('../models/genre');


const express = require('express');
const router = express.Router();

// GET all movies
router.get('/', async (req, res) => {
	const movies = await Movie.find().sort('name');
	return res.send(movies);
});

// GET a movie by id
router.get('/:id', async (req, res) => {
	try {
	  const movie = await Movie.findById(req.params.id);
	  res.send(movie);
	} catch(err) {
		return res.status(404).send(`Movie not found for id: ${req.params.id}`);
	}
});

// POST a movie with genre
router.post('/', async (req, res) => {
	const { error } = validate(req.body);

	if(error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId);

	if(!genre) return res.status(400).send('Invalid genre'); // Use try catch for this

	let movie = new Movie({
		title: req.body.name,
		genre: {
			_id: genre._id,
			name: genre.name
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate
	});

	res.send(movie);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

  if (!movie) return res.status(404).send(`Movie not found for id: ${req.params.id}`);
  
  res.send(movie);
});

// DELETE a movie
router.delete('/:id', async (req, res) => {
   try {
		const movie = await Movie.findByIdAndRemove(req.params.id);
		res.send(movie);
	} catch(err) {
		return res.status(404).send(`Movie not found for id: ${req.params.id}`);
	}
});

module.exports = router;