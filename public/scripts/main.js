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
		success: updateSuccess,
		error: updateFail
	})
})

$('#commentForm').on('submit', function(e){
	e.preventDefault();
	console.log("comment form button worked")
	$.ajax({
		method: 'POST',
		url:'/profile/search/'+$(this).attr('data-id'),
		data:$(this).serialize(),
		success: commentSuccess,
		error: commentFail
	}).then(function(data){
		console.log('hello')
	});
})



$( function() {
    $( ".accordion" ).accordion({
      collapsible: true
    });
  } );
$(".navbar-toggler").click(function(){
        $(".collapse").collapse('toggle');
    });

function updateSuccess(){
	console.log('this would send')
	window.location.href="/profile"
}

function updateFail(){
	console.log('this did not send...')
}


$('#deleteAccountButton').click(function(e){
	e.preventDefault();
	$.ajax({
		method: 'DELETE',
		url:"/profile/edit",
		data:$(this).serialize(),
		success: updateSuccess,
		error: updateFail
	})
})

function deleteSuccess(){
	console.log('this would delete')
	window.location.href="/"
}

function deleteFail(){
	console.log('this did not send...')
}
function commentSuccess(){
	console.log('this would post comment')
	// window.location.href="/"
}

function commentFail(){
	console.log('this did not send a comment...')
}

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