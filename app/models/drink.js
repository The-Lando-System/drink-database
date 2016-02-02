var mongoose = require('mongoose');

module.exports = mongoose.model('Drink', {
	name: 		{ type: String, default: '' },
	style: 		{ type: String, default: '' },
	type: 		{ type: String, default: '' },
	abv: 		{ type: String, default: '' },
	company: 	{ type: String, default: '' },
	city: 		{ type: String, default: '' },
	state: 		{ type: String, default: '' }
});