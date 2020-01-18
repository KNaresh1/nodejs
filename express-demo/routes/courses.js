const Joi = require('joi');

const express = require('express');
const router = express.Router();

const courses = [
	{ id: 1, name: 'course1' },
	{ id: 2, name: 'course2' },
	{ id: 3, name: 'course3' }
];

// GET all courses
router.get('/', (req, res) => {
	res.send(courses);
});

// GET a course
router.get('/:id', (req, res) => {
	// Lookup for existing course
	const course = findCourse(req.params.id);

	if(!course) {
		return res.status(404).send(`Course not found for the course id: ${req.params.id}`);
	}
	res.send(course);
});

// POST a course
router.post('/', (req, res) => {
	const { error } = validateCourse(req.body);

	if(error) {
		return res.status(400).send(error.details[0].message);
	}

	const course = { id: courses.length + 1, name: req.body.name };
	courses.push(course);

	res.send(course);
});

// PUT a course
router.put('/:id', (req, res) => {
	// Lookup for existing course
	const course = findCourse(req.params.id);

	if(!course) {
		return res.status(404).send(`Course not found for the course id: ${req.params.id}`);
	}

	// Validate req
	const { error } = validateCourse(req.body); // Equivalent to result.error

	if(error) {
		return res.status(400).send(error.details[0].message);
	}

	// Update course
	course.name = req.body.name;
	res.send(course);
});

// DELETE a course
router.delete('/:id', (req, res) => {
	// Lookup for existing course
	const course = findCourse(req.params.id);

	if(!course) {
		return res.status(404).send(`Course not found for the course id: ${req.params.id}`);
	}

	// Delete
	const index = courses.indexOf(course);
	courses.splice(index, 1);

	res.send(course);
});

function findCourse(courseId) {
	return courses.find(c => c.id === parseInt(courseId))
}

function validateCourse(course) {
	// Validate course using joi tool
	const schema = { name: Joi.string().min(3).required() };

	return Joi.validate(course, schema);
}

module.exports = router