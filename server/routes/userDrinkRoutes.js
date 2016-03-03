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

	// Retrieve all drinks tied to a user ID
	userDrinkRoutes.get('/:userId', function(req,res){
		UserDrink.find({userId:req.params.userId}, function(err,userDrinks){
			if (err) { res.send(err) };
			if (userDrinks.length===0) { res.send({'message':'No drinks found!'})};

			// For each user drink, find the rest of the drink data, add it to an object,
			// and return that to the user. Recurse to find drinks synchronously.
			drinks = [];
			findNextUserDrink(0);
			function findNextUserDrink(i){
				if (i>userDrinks.length-1){
					res.send(drinks);
					return;
				}
				Drink.find({_id:userDrinks[i].drinkId}, function(err,drink){
					if (drink && drink.length>0){
						drink[0].tasteNotes = userDrinks[i].tasteNotes;
						drink[0].otherNotes = userDrinks[i].otherNotes;
						drink[0].smellNotes = userDrinks[i].smellNotes;
						drink[0].rating = userDrinks[i].rating;
						drinks.push(drink[0]);	
					}
					findNextUserDrink(i+1);
				});
			};
		});
	});


	

	app.use('/user-drinks',userDrinkRoutes);

};