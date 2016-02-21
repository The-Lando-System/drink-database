var jwt = require('jsonwebtoken');
var express = require('express');
var path = require('path');

var baseDir = path.resolve(__dirname + '/..');
var staticRoutes = express.Router();

module.exports = function(app) {

	// Application States  ======================
	var index = baseDir + '/public/index.html';
	staticRoutes.get('/', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/login', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/home', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/drink-finder', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/drink-viewer', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/user-management', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/user-management/*', function(req,res){
		res.sendFile(index);
	});
	staticRoutes.get('/user-page', function(req,res){
		res.sendFile(index);
	});

	// Common View Components ===================
	staticRoutes.get('/error-message', function(req,res){
		res.sendFile(baseDir + '/public/common-components/error-message.html');
	});
	staticRoutes.get('/success-message', function(req,res){
		res.sendFile(baseDir + '/public/common-components/success-message.html');
	});
	staticRoutes.get('/navbar', function(req,res){
		res.sendFile(baseDir + '/public/navbar/navbar.html');
	});

	app.use('/',staticRoutes);
};