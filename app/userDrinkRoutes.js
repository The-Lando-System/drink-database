var jwt = require('jsonwebtoken');
var express = require('express');

var Drink = require('./models/drink');

var userDrinkRoutes = express.Router();

module.exports = function(app) {

	// Verify user token ===========================
	userDrinkRoutes.use(function(req,res,next){
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

	// Create a drink
	userDrinkRoutes.post('/', function(req,res){
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

	app.use('/drinks',userDrinkRoutes);

};