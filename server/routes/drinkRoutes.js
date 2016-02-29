var jwt = require('jsonwebtoken');
var express = require('express');
var path = require('path');
var base = path.resolve(__dirname + '/../..');
var Drink = require(base + '/server/models/drink');

var drinkRoutes = express.Router();

module.exports = function(app) {

	// Drinks API ==================================

	// Get all drinks
	drinkRoutes.get('/', function(req,res){
		Drink.find({}, function(err,drinks){
			if (err) {
				res.send(err)
			} else {
				if (drinks.length === 0) {
					res.send({ message: "No drinks found!" });
				} else {
					res.json(drinks);
				}
			}
		});
	});

	// Get drinks by name
	drinkRoutes.post('/findByName', function(req,res){
		Drink.find({
			name: { $regex : new RegExp(req.body.drinkName, "i") }
		}, function(err,drinks){
			if (err) {
				res.send(err)
			} else {
				if (drinks.length === 0) {
					res.send({ message: "No drinks found!" });
				} else {
					res.json(drinks);
				}
			}
		});
	});

	// Find a drink by its ID
	drinkRoutes.get('/:drinkId', function(req,res){
		Drink.find({_id:req.params.drinkId}, function(err,drinks){
			if (err) {
				res.send(err)
			} else {
				if (drinks.length === 0) {
					res.send({ message: "No drinks found!" });
				} else {
					res.json(drinks);
				}
			}
		});
	});

	app.use('/drinks',drinkRoutes);

};