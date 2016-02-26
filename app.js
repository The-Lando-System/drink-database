// Set Up =============================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');
var User = require('./app/models/user');

// Configuration ======================
console.log("----- Configuration -----");
var devConfig = false;
try {
	devConfig = require('./config/config');
	console.log('[x] Found Dev Config File! Happy Debugging!');
} catch(err) {
	console.log('[x] No Dev Config File... Going into Production!');
}

var dbUrl =  devConfig ? devConfig.db : process.env.DB_URL;
var secretStr = devConfig ? devConfig.secret : process.env.SECRET;

try {
	mongoose.connect(dbUrl);
	console.log('[x] Successfully Connected to Mongo!');
} catch(err) {
	console.log('[] Failed to Connect to Mongo.....');
}

app.set('superSecret', secretStr);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended':'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type:'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Routes ==============================
require('./app/staticRoutes')(app);
require('./app/drinkRoutes')(app);
require('./app/userDrinkRoutes')(app);
require('./app/adminDrinkRoutes')(app);
require('./app/adminUserRoutes')(app);

// User Authentication =================
app.post('/authenticate', function(req,res){
	User.findOne({
		username: req.body.username		
	}, function(err,user){
		if (err) throw err;
		if (!user) {
			console.log("WARNING: Authentication failed! Could not find user: " + req.body.username);
			res.json({ success: false, message: 'Authentication failed, user not found!' });
		} else if (user) {
			if (!passwordHash.verify(req.body.password, user.password)) {
				console.log("WARNING: Authentication failed! Wrong password for user: " + req.body.username);
				res.json({ success: false, message: 'Authentication failed, wrong password!' });
			} else {
				var token = jwt.sign(user, app.get('superSecret'), {
					expiresIn: 86400 
				});
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}
		}
	});
});

// Export the app ======================
exports = module.exports = app;
console.log("------> Ready! <--------");