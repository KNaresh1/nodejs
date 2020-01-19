const {Customer, validate} = require('../models/customer');

const express = require('express');
const router = express.Router();

// GET all customers
router.get('/', async (req, res) => {
	const customers = await Customer.find().sort('name');
	return res.send(customers);
});

// GET a customer by id
router.get('/:id', async (req, res) => {
	try {
		const customer = await Customer.findById(req.params.id);
		res.send(customer);
	} catch(err) {
		return res.status(404).send(`Customer not found for id: ${req.params.id}`);
	}
});

// POST a customer
router.post('/', async (req, res) => {
	const { error } = validate(req.body);

	if(error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold });
	customer = await customer.save();

	res.send(customer);
});

// PUT (UPDATE) a customer
router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);

	if(error) return res.status(400).send(error.details[0].message);

	try {
		const customer = await Customer.findByIdAndUpdate(req.params.id, 
			{ name: req.body.name, phone: req.body.phone, isGold: req.body.isGold }, 
			{ new: true });
		res.send(customer);
	} catch(err) {
		return res.status(404).send(`Customer not found for id: ${req.params.id}`);
	}
});

// DELETE a customer
router.delete('/:id', async (req, res) => {
	try {
		const customer = await Customer.findByIdAndRemove(req.params.id);
		res.send(customer);
	} catch(err) {
		return res.status(404).send(`Customer not found for id: ${req.params.id}`);
	}
});

module.exports = router;