const {Gener, validate} = require('../models/gener');

const express = require('express');
const router = express.Router();


// GET all geners
router.get('/', async (req, res) => {
	const geners = await Gener.find().sort('name');
	res.send(geners);
});

// GET a gener by id
router.get('/:id', async (req, res) => {
	try {
		const gener = await Gener.findById(req.params.id);
		res.send(gener);
	} catch(err) {
		return res.status(404).send(`Gener not found for id: ${req.params.id}`);
	}
});

// POST a gener
router.post('/', async (req, res) => {
	const { error } = validate(req.body);

	if(error) return res.status(400).send(error.details[0].message);

	let gener = new Gener({ name: req.body.name });
	gener = await gener.save();

	res.send(gener);
});

// PUT (UPDATE) a gener
router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);

	if(error) return res.status(400).send(error.details[0].message);

	try {
		const gener = await Gener.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
		res.send(gener);
	} catch(err) {
		return res.status(404).send(`Gener not found for id: ${req.params.id}`);
	}
});

// DELETE a gener
router.delete('/:id', async (req, res) => {
	try {
		const gener = await Gener.findByIdAndRemove(req.params.id);
		res.send(gener);
	} catch(err) {
		return res.status(404).send(`Gener not found for id: ${req.params.id}`);
	}
});

module.exports = router;