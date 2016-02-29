var jwt = require('jsonwebtoken');
var express = require('express');
var path = require('path');
var base = path.resolve(__dirname + '/../..');
var Drink = require(base + '/server/models/drink');

var adminDrinkRoutes = express.Router();

module.exports = function(app) {

	// Verify user token and ensure they are an admin role ==============================
	adminDrinkRoutes.use(function(req,res,next){
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err,decoded){
				if (err) {
					return res.json({ success: false, message: 'Failed to authenticate token!'});
				} else {
					if (decoded._doc.role === 'admin'){
						req.decoded = decoded._doc;
						next();
					} else {
						return res.json({ success: false, message: 'You do not have an admin role!'});
					}
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

	// Create a drink
	adminDrinkRoutes.post('/', function(req,res){
		Drink.create({
			name: 		req.body.name,
			type: 		req.body.type,
			style: 		req.body.style,
			company: 	req.body.company,
			abv: 		req.body.abv,
			city: 		req.body.city,
			state: 		req.body.state,
			addedBy: 	req.body.addedBy,
			timeAdded: 	req.body.timeAdded 
		}, function(err,drink){
			if (err) { res.send(err) };
			res.json({ message: 'Drink with ID ' + drink._id + ' successfully created!' });
		});
	});

	// Edit a drink
	adminDrinkRoutes.put('/:drinkId', function(req,res){
		Drink.findById(req.params.drinkId, function(err,drink){
			if (err) { res.send(err) };
			drink.name 			= req.body.name 		|| drink.name;
			drink.type  		= req.body.type 		|| drink.type;
			drink.style     	= req.body.style     	|| drink.style;
			drink.company  		= req.body.company  	|| drink.company;
			drink.abv  			= req.body.abv  		|| drink.abv;
			drink.city      	= req.body.city      	|| drink.city;
			drink.state      	= req.body.state      	|| drink.state;
			drink.addedBy 		= req.body.addedBy 		|| drink.addedBy;
			drink.timeAdded 	= req.body.timeAdded 	|| drink.timeAdded;
			drink.save(function(err){
				if (err) { res.send(err) };
				res.json({ message: 'Drink with ID ' + req.params.drinkId + ' was successfully updated!' });
			});
		});
	});

	// Delete a drink
	adminDrinkRoutes.delete('/:id', function(req,res){
		Drink.remove({ _id: req.params.id }, function(err,drink){
			if (err) { res.send(err) };
			res.json({ message: 'Successfully removed drink with id ' + req.params.id });
		});
	});

	app.use('/drinks',adminDrinkRoutes);

};