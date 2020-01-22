const {Genre, validate} = require('../models/genre');

const express = require('express');
const router = express.Router();


// GET all genres
router.get('/', async (req, res) => {
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

// GET a genre by id
router.get('/:id', async (req, res) => {
	try {
		const genre = await Genre.findById(req.params.id);
		res.send(genre);
	} catch(err) {
		return res.status(404).send(`Genre not found for id: ${req.params.id}`);
	}
});

// POST a genre
router.post('/', async (req, res) => {
	const { error } = validate(req.body);

	if(error) return res.status(400).send(error.details[0].message);

	let genre = new Genre({ name: req.body.name });
	genre = await genre.save();

	res.send(genre);
});

// PUT (UPDATE) a genre
router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);

	if(error) return res.status(400).send(error.details[0].message);

	try {
		const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
		res.send(genre);
	} catch(err) {
		return res.status(404).send(`Genre not found for id: ${req.params.id}`);
	}
});

// DELETE a genre
router.delete('/:id', async (req, res) => {
	try {
		const genre = await Genre.findByIdAndRemove(req.params.id);
		res.send(genre);
	} catch(err) {
		return res.status(404).send(`Genre not found for id: ${req.params.id}`);
	}
});

module.exports = router;