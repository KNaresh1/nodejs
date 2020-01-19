const Joi = require('joi');

const express = require('express');
const router = express.Router();

const geners = [
	{ id: 1, name: 'Action' },  
  	{ id: 2, name: 'Horror' },  
  	{ id: 3, name: 'Romance' }
];

router.get('/', (req, res) => {
	res.send(geners);
});

router.get('/:id', (req, res) => {
	const gener = findGener(req.params.id);

	if(!gener) return res.status(404).message(`Gener not found for id: ${req.params.id}`);

	res.send(gener);
});

router.post('/', (req, res) => {
	const { error } = validateGener(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	const gener = { id: geners.length + 1, name: req.body.name };
	geners.push(gener);

	res.send(gener);
});

router.put('/:id', (req, res) => {
	const gener = findGener(req.params.id);
	if(!gener) return res.status(404).message(`Gener not found for id: ${req.params.id}`);

	const { error } = validateGener(req.body);
	if(error) return res.status(400).send(error.details[0].message);

	gener.name = req.body.name;
	res.send(gener);
});

router.delete('/:id', (req, res) => {
	const gener = findGener(req.params.id);
	if(!gener) return res.status(404).message(`Gener not found for id: ${req.params.id}`);

	const index = geners.indexOf(gener);
	geners.splice(index, 1);

	res.send(gener);
});

function findGener(generId) {
	return geners.find(g => g.id === parseInt(generId))
}

function validateGener(gener) {
	const schema = { name: Joi.string().min(3).required() };
	return Joi.validate(gener, schema);
}

module.exports = router;