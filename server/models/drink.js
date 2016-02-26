var mongoose = require('mongoose');

module.exports = mongoose.model('Drink', {
	name: 			{ type: String, default: '' },
	type:  			{ type: String, default: '' },
	style: 			{ type: String, default: '' },
	company:    { type: String, default: '' },
	abv:  			{ type: String, default: '' },
	city:  			{ type: String, default: '' },
	state:      { type: String, default: '' },
	tasteNotes: { type: String, default: '' },
	smellNotes: { type: String, default: '' },
	otherNotes: { type: String, default: '' },
	rating: 		{ type: String, default: '' },
	addedBy: 		{ type: String, default: '' },
	timeAdded: 	{ type: String, default: '' }
});