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
			if (drinks.length === 0) {
				res.send({ message: "No drinks found!" });
			} else {
				res.json(drinks);
			}
		});
	});

	// Create a drink
	drinkApiRoutes.post('/', function(req,res){
		Drink.create({
			name: 			req.body.name,
			type: 			req.body.type,
			style: 			req.body.style,
			company: 		req.body.company,
			abv: 				req.body.abv,
			city: 			req.body.city,
			state: 			req.body.state,
			tasteNotes: req.body.tasteNotes,
			smellNotes: req.body.smellNotes,
			otherNotes: req.body.otherNotes,
			rating: 		req.body.rating,
			addedBy: 		req.body.addedBy,
			timeAdded: 	req.body.timeAdded 
		}, function(err,drink){
			if (err) { res.send(err) };
			res.json({ message: 'Drink with ID ' + drink._id + ' successfully created!' });
		});
	});

	// Edit a drink
	drinkApiRoutes.put('/:drinkId', function(req,res){
		Drink.findById(req.params.drinkId, function(err,drink){
			if (err) { res.send(err) };
			drink.name 			= req.body.name 		|| drink.name;
			drink.type  		= req.body.type 		|| drink.type;
			drink.style     	= req.body.style     	|| drink.style;
			drink.company  		= req.body.company  	|| drink.company;
			drink.abv  			= req.body.abv  		|| drink.abv;
			drink.city      	= req.body.city      	|| drink.city;
			drink.state      	= req.body.state      	|| drink.state;
			drink.tasteNotes  	= req.body.tasteNotes 	|| drink.tasteNotes;
			drink.smellNotes  	= req.body.smellNotes 	|| drink.smellNotes;
			drink.otherNotes  	= req.body.otherNotes 	|| drink.otherNotes;
			drink.rating      	= req.body.rating     	|| drink.rating;
			drink.addedBy 		= req.body.addedBy 		|| drink.addedBy;
			drink.timeAdded 	= req.body.timeAdded 	|| drink.timeAdded;
			drink.save(function(err){
				if (err) { res.send(err) };
				res.json({ message: 'Drink with ID ' + req.params.drinkId + ' was successfully updated!' });
			});
		});
	});

	// Delete a drink
	drinkApiRoutes.delete('/:id', function(req,res){
		Drink.remove({ _id: req.params.id }, function(err,drink){
			if (err) { res.send(err) };
			res.json({ message: 'Successfully removed drink with id ' + req.params.id });
		});
	});

	// Get drinks by name
	drinkApiRoutes.post('/findByName', function(req,res){
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