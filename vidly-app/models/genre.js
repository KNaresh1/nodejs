const Joi = require('joi');
const mongoose = require('mongoose');

// Create schema in mongoose DB
const genreSchema = new mongoose.Schema({ 
	name: { type: String, required: true, minLength: 5, maxLength: 50 } 
});

// Create model in mongoose DB
const Genre = mongoose.model('genre', genreSchema);

function validateGenre(genre) {
	const schema = { 
		name: Joi.string().min(5).max(50).required()
	};
	return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;