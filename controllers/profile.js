const 	mongoose = require('mongoose'),
		express = require('express'),
		passport = require('../config/passportConfig'),
		isLoggedIn = require('../middleware/isLoggedIn'),
		request = require('request'),
		profileRoute = express.Router(),
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
	res.render('profile', {currentUser:res.locals.currentUser});
});

profileRoute.get('/search', isLoggedIn, function(req, res){

	request(`https://www.zipcodeapi.com/rest/${process.env.ITS_A_KEY}/radius.json/${res.locals.currentUser.zipcode}/10/miles?minimal`, function(error, response, body){
		if(error){
			return console.log(err);
		} 
		//made the json call into an object
		let bodyObj = JSON.parse(body);
		bodyObj.zip_codes.forEach(function(zip){
			zip = Number(zip);
			User.find({zipcode: zip}, function(err, match){
				if(err){
					return console.log('it broke');
				} 
				match.forEach(function(element){
					if(element !== []){
						matchedUsers.push(element);
					}
				});
			});
		});
		// console.log('matchedUsers looks like this:', matchedUsers);
		// res.render('search', {matchedUsers: matchedUsers, currentUser:res.locals.currentUser})
		// res.render('search', {matchedUsers: matchedUsers})
	});
	res.render('search', {matchedUsers: matchedUsers, currentUser:res.locals.currentUser})
	matchedUsers = [];
});


profileRoute.get('/edit', isLoggedIn, function(req, res){
	res.render('edit')
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
		res.render('profile')
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