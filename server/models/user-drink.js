var mongoose = require('mongoose');

module.exports = mongoose.model('UserDrink', {
	userId: 	{ type: String, default: '' },
	drinkId: 	{ type: String, default: '' },
	tasteNotes: { type: String, default: '' },
	smellNotes: { type: String, default: '' },
	otherNotes: { type: String, default: '' },
	rating: 	{ type: String, default: '' }
});