var jwt = require('jsonwebtoken');
var express = require('express');
var path = require('path');
var base = path.resolve(__dirname + '/../..');
var Drink = require(base + '/server/models/drink');
var UserDrink = require(base + '/server/models/user-drink');

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

	// Create a drink for a user
	userDrinkRoutes.post('/', function(req,res){
		UserDrink.create({
			userId: 	req.body.userId,
			drinkId: 	req.body.drinkId,
			tasteNotes: req.body.tasteNotes,
			smellNotes: req.body.smellNotes,
			otherNotes: req.body.otherNotes,
			rating: 	req.body.rating
		}, function(err,drink){
			if (err) { res.send(err) };
			res.json({ message: 'Drink successfully added for user!' });
		});
	});


	app.use('/user-drinks',userDrinkRoutes);

};