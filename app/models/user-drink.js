var mongoose = require('mongoose');

module.exports = mongoose.model('UserDrink', {
	userId: 	{ type: String, default: '' },
	drinkId: 	{ type: String, default: '' }
});