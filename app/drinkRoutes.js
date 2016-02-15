var jwt = require('jsonwebtoken');
var express = require('express');

var Drink = require('./models/drink');

var drinkRoutes = express.Router();

module.exports = function(app) {

	// Drinks API ==================================

	// Get all drinks
	drinkRoutes.get('/', function(req,res){
		Drink.find({}, function(err,drinks){
			if (err) { res.send(err) };
			if (drinks.length === 0) {
				res.send({ message: "No drinks found!" });
			} else {
				res.json(drinks);
			}
		});
	});

	// Get drinks by name
	drinkRoutes.post('/findByName', function(req,res){
		Drink.find({
			name: { $regex : new RegExp(req.body.drinkName, "i") }
		}, function(err,drinks){
			if (err) { res.send(err) };
			if (drinks.length === 0) {
				res.send({ message: "No drinks found!" });
			} else {
				res.json(drinks);
			}
		});
	});

	app.use('/drinks',drinkRoutes);

};