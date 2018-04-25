console.log('main js connected')

//button logic 


// onclick="clickedThing()"

// ==
//get button by id 
// ==
$(document).ready(function() {

$('#updateForm').on('submit', function(e){
	e.preventDefault();
	console.log("well the button is working at least")
	$.ajax({
		method: 'PUT',
		url:"/profile/edit",
		data:$(this).serialize(),
		success: console.log('this would send'),
		error: console.log('this would NOT SEND')
	})
})

// function clickedThing(){
// 	console.log("GAAAAH!")
// }

//  console.log('something');
//  $('#searchUsersButton').click(function(){
	// $.ajax({
	// 	method:"GET",
	// 	url:"https://www.zipcodeapi.com/rest/ITS_A_KEY/radius.json/98052/10/miles?minimal",
	// 	success: console.log('it worked'),
	// 	error: console.log('it did not work')
	// })
// })
});

// ==
//perform ajax call
// ==

//							relative zipcode needed below VVV : req.user.zipcode???
//https://www.zipcodeapi.com/rest/ITS_A_KEY/radius.json/currentUser.zipcode/10/miles?minimal


//store resulting array in variable
//res.zipcodes

//get all users by matching array to users' zipcodes


//pseudo: find({zipcode: AJAXARRAY }) 
//foreach(element){} ...
//<h3>element.name</h3>
//<p><element.instruments>...