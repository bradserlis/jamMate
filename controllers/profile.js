const 	mongoose = require('mongoose'),
		express = require('express'),
		passport = require('../config/passportConfig'),
		isLoggedIn = require('../middleware/isLoggedIn'),
		request = require('request'),
		profileRoute = express.Router(),
		Comment = require('../models/comments')
		User = require('../models/user');

//=====
//other declared variables
//=====

let matchedUsers = [];

//=====
//routes
//=====

//==
//read
//==

profileRoute.get('/', isLoggedIn, function(req, res){
	res.render('./profile/profile', {currentUser:res.locals.currentUser});
});


profileRoute.get('/search', isLoggedIn, function(req, res){
	request(`https://www.zipcodeapi.com/rest/${process.env.ITS_A_KEY}/radius.json/${res.locals.currentUser.zipcode}/15/miles?minimal`, 
		function(error, response, body){
		if(error){
			return console.log(err);
		} 
		//made the json call into an object
		let bodyObj = JSON.parse(body);
		User.find({zipcode: {$in: bodyObj.zip_codes}})
		.then(function(matchedUsers){
			res.render('./profile/search', {matchedUsers: matchedUsers, currentUser:res.locals.currentUser});
		})
		.catch(function(err){
			console.log('herp', err);
			res.send(err);
		});
	}); // end callback function from request call
});
 

profileRoute.get('/edit', isLoggedIn, function(req, res){
	res.render('./profile/edit')
})


//==
//create
//==


//==
//update
//==

profileRoute.put('/edit', function(req, res){
	User.findOneAndUpdate({name: res.locals.currentUser.name}, req.body, function(err, result){
		if(err){
		return console.log(err);
		}
		res.render('./profile/profile')
		console.log(result)
	})
})

//==
//destroy
//==

profileRoute.delete('/edit', function(req, res){
	User.findByIdAndRemove(res.locals.currentUser.id, function(err, success){
		if(err){
			console.log(err);
		}
		res.render('home')
	})
})


module.exports = profileRoute;