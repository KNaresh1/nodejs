const Joi = require('joi');
const mongoose = require('mongoose');

// Create schema in mongoose DB...
const generSchema = new mongoose.Schema({ 
	name: { type: String, required: true, minLength: 5, maxLength: 50 } 
});

// Create model
const Gener = mongoose.model('Gener', generSchema);

function validateGener(gener) {
	const schema = { 
		name: Joi.string().min(5).max(50).required()
	};
	return Joi.validate(gener, schema);
}

exports.Gener = Gener;
exports.generSchema = generSchema;
exports.validate = validateGener;