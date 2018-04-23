const 	mongoose = require('mongoose'),
		express = require('express'),
		passport = require('../config/passportConfig'),
		isLoggedIn = require('../middleware/isLoggedIn'),
		profileRoute = express.Router();

const User = require('../models/user');


profileRoute.get('/', isLoggedIn, function(req, res){
	res.render('profile');
});

module.exports = profileRoute;