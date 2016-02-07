var jwt = require('jsonwebtoken');
var express = require('express');

var Drink = require('./models/drink');

var drinkApiRoutes = express.Router();

module.exports = function(app) {

	// Verify user token ===========================
	drinkApiRoutes.use(function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err,decoded){
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token!'});
				} else {
					req.decoded = decoded._doc;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided!'
			});
		}
	});

	// Drinks API ==================================

	// Get all drinks
	drinkApiRoutes.get('/', function(req,res){
		Drink.find({}, function(err,drinks){
			if (err) { res.send(err) };
			res.json(drinks);
		});
	});

	// Create a drink
	drinkApiRoutes.post('/', function(req,res){
		Drink.create({
			name: 		req.body.name,
			style: 		req.body.style,
			company: 	req.body.company,
			abv: 		req.body.abv,
			city: 		req.body.city,
			state: 		req.body.state,
			tasteNotes: req.body.tasteNotes,
			smellNotes: req.body.smellNotes,
			otherNotes: req.body.otherNotes,
			rating: 	req.body.rating 
		}, function(err,drink){
			if (err) { res.send(err) };
			res.json({ message: 'Drink with ID ' + drink._id + 'successfully created!' });
		});
	});

	// Delete a drink
	drinkApiRoutes.delete('/:id', function(req,res){
		Drink.remove({ _id: req.params.id }, function(err,drink){
			if (err) { res.send(err) };
			res.json({ message: 'Successfully removed drink with id ' + req.params.id });
		});
	});

	// Test route
	drinkApiRoutes.get('/hello/:username', function(req,res){
		var hello = {
			name: "HelloMessage",
			description: "This message says hello",
			message: "Hello " + req.params.username
		};
		res.json(hello);
	});

	app.use('/drinks',drinkApiRoutes);

};