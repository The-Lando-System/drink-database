var mongoose = require('mongoose');

module.exports = mongoose.model('UserDrink', {
	username: { type: String, default: '' },
	drinkId:  { type: String, default: '' }
});