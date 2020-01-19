const Joi = require('joi');
const mongoose = require('mongoose');
const { generSchema } = require('./gener');

const Movie = mongoose.model('Movie', new mongoose.Schema(
	{
		 title: { type: String, required: true, trim: true, minLength: 5, maxLength: 255 },
		 gener: { type: generSchema, required: true },
		 numberInStock: { type: Number, required: true, minLength: 0, maxLength: 255 },
		 dailyRentalRate: { type: Number, required: true, minLength: 0, maxLength: 255 } 
	}
));

function validateMovie(movie) {
	const schema = { 
		name: Joi.string().min(5).max(50).required(),
		generId: Joi.string().required(),
		numberInStock: Joi.number().min(0).max(50).required(),
		dailyRentalRate: Joi.number().min(0).max(50).required()
	};
	return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;