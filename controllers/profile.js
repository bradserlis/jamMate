const 	mongoose = require('mongoose'),
		express = require('express'),
		passport = require('../config/passportConfig'),
		isLoggedIn = require('../middleware/isLoggedIn'),
		request = require('request'),
		profileRoute = express.Router();

const User = require('../models/user');


profileRoute.get('/', isLoggedIn, function(req, res){
	res.render('profile');
});

profileRoute.get('/search', isLoggedIn, function(req, res){
	request(`https://www.zipcodeapi.com/rest/${process.env.ITS_A_KEY}/radius.json/98052/10/miles?minimal`, function(err, res, body){
		if(err){
			return console.log(err);
		} 
		console.log(body)
	})	
	res.render('search');
});

function calledZipcodes(val){
	return val;
}

module.exports = profileRoute;