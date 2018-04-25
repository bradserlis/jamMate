const 	mongoose = require('mongoose'),
		express = require('express'),
		passport = require('../config/passportConfig'),
		isLoggedIn = require('../middleware/isLoggedIn'),
		request = require('request'),
		profileRoute = express.Router();


const User = require('../models/user');
let matchedUsers = [];

var allZips = [];
profileRoute.get('/', isLoggedIn, function(req, res){
	res.render('profile');
});

profileRoute.get('/search', isLoggedIn, function(req, res){
	request(`https://www.zipcodeapi.com/rest/${process.env.ITS_A_KEY}/radius.json/${res.locals.currentUser.zipcode}/10/miles?minimal`, function(err, res, body){
		if(err){
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
				})
			})
		})
		// console.log('matchedUsers looks like this:', matchedUsers);

	})
		res.render('search', {matchedUsers: matchedUsers, currentUser:res.locals.currentUser})
		matchedUsers=[];
})

	// for each of the array of zipcodes, do user.find, match user zipcode to the current item of the foreach loop
// if it matches, push to the new user array of objects
// render that array onto page

// 		//send back all users
// 		User.find({}, function(err, val){
// 		//send back only the zipcodes from those users
// 			val.forEach( (item) =>{
// 			//store the zipcode for moving to array	
// 				let currZip = item.zipcode;
// 			//push the value into the array, and repeat until through all users
// 				allZips.push(currZip);
// 			})
// 		});
// 		console.log('allzips looks like this:', allZips);

// 		// const matchedZip = bodyObj.zip_codes.filter(function(value){
// 		// 	allZips.forEach( (zip) => {
// 		// 		return value == zip;
// 		// 	});
// 		})
// 		console.log(matchedZip);
// 	})
// 	res.render('search');
// })	


module.exports = profileRoute;