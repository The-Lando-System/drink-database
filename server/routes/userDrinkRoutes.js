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
			if (err) {
				res.send(err)
				return;
			}
			if (userDrinks.length===0) {
				res.send({'message':'No drinks found!'})
				return;
			}

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

	// Edit a user drink
	userDrinkRoutes.put('/:userId/:drinkId', function(req,res){
		UserDrink.find({drinkId:req.params.drinkId, userId:req.params.userId}, function(err,userDrink){
			if (err) { res.send(err)
				return;
			}
			if (userDrink.length > 1){
				res.send({'message':'Found more than one drink to edit!'});
				return;
			}
			if (userDrink.length === 0){
				res.send({'message':'Could not find the drink to edit!'});
				return;
			}
			var editedUserDrink = userDrink[0];
			editedUserDrink.tasteNotes	= req.body.tasteNotes 	|| editedUserDrink.tasteNotes;
			editedUserDrink.smellNotes  = req.body.smellNotes 	|| editedUserDrink.smellNotes;
			editedUserDrink.otherNotes	= req.body.otherNotes   || editedUserDrink.otherNotes;
			editedUserDrink.rating  	= req.body.rating  		|| editedUserDrink.rating;
			editedUserDrink.save(function(err){
				if (err) {
					res.send(err)
					return;
				}
				res.send({ message: 'Drink with ID ' + req.params.drinkId
					+ ' was successfully updated for user ' + req.params.userId + '!'});
				return;
			});
		});
	});
	
	// Delete a user drink
	userDrinkRoutes.delete('/:userId/:drinkId', function(req,res){
		UserDrink.find({drinkId:req.params.drinkId, userId:req.params.userId}, function(err,userDrink){
			if (err) {
				res.send(err);
				return;
			}
			if (userDrink.length > 1){
				res.send({'message':'Found more than one drink to delete!'});
				return;
			}
			if (userDrink.length === 0){
				res.send({'message':'Could not find the drink to delete!'});
				return;
			}
			var drinkToDelete = userDrink[0];

			drinkToDelete.remove({ _id: drinkToDelete._id }, function(err,drink){
				if (err) { res.send(err) };
				res.send({ message: 'Successfully removed drink with id ' + req.params.drinkId 
					+ ' for user ' + req.params.userId + '!' });
			});
		});
	});

	app.use('/user-drinks',userDrinkRoutes);

};