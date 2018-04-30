//modules I require to run this app
require('dotenv').config(); //loads the .env file
const 		 express = require('express'),
			 app = express(),
			 bodyParser = require('body-parser'),
			 mongoose = require('mongoose'),
			 expressLayouts = require('express-ejs-layouts'),
			 flash = require('connect-flash'),
			 authRoute = require('./controllers/auth'),
			 profileRoute = require('./controllers/profile'),
			 passport = require('./config/passportConfig'),
			 session = require('express-session'),
			 isLoggedIn = require('./middleware/isLoggedIn'),
			 Comment = require('./models/comments'),
			 User = require('./models/user'),
			 port = process.env.PORT || 3000;


//connect to DB

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jamMate');

//set and use statements

app.set('view engine', 'ejs');
// app.set('views', '/')
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/public'));

//makes life easier....

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.alerts = req.flash();
	next();
});

//top-level routes

app.get('/', function(req, res){
	res.render('home');
});

app.get('/show/:id', function(req, res){
	User.findById(req.params.id, function(err, thisUser){
	res.render('show', {thisUser: thisUser})
	})
})

app.post('/show/:id', function(req, res){
	console.log('made it to the backend')
	User.findById(req.params.id, (err, target)=>{
		console.log('user id to match:',req.params.id)
		console.log('user that came back from search:',target)
		console.log('req.body to be used to create new comment:',req.body)
		Comment.create(req.body, (err, commentData)=>{
		if(err){
			console.log(err)
		}
		console.log("this is the result of the save, commentdata:", commentData)	
		console.log('this is target comments:', target.comments)
		target.comments.push(commentData);
		console.log('this is target comments after the push', commentData)
		target.save();
		});
	});
	res.send("success message")
})

// app.post('/show/:id', function(req, res){
// 	console.log('made it to the backend')
// 	User.findById(req.params.id, (err, target)=>{
// 		console.log(req.params.id)
// 		console.log(target)
// 		User.update({_id: req.params.id}, {$push: {comments: req.body}}, (err, success)=>{
// 		console.log(req.body)
// 		if(err){
// 			console.log(err);
// 		} else
// 		console.log(success);	
// 		});
// 	});
// 	res.redirect("/profile")
// })


//include routes from any controllers/routes

app.use('/auth', authRoute);
app.use('/profile', profileRoute);


//listen

app.listen(port);