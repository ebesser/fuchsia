var punchFor = function(){
	var forFist = $('#for_fist_front');
	var opponent = $("#fighter2");
	forFist
		.css({
			backgroundPosition: "0 -126px",
			width: "448px"
			})
		.animate({marginLeft: "100px", marginTop: "-50px"},50, function(){
			$(this).css({
			backgroundPosition: "0 -249px",
			})
			.delay(60)
			.animate({marginLeft: "-331px", marginTop: "0px"},600)
			})
	opponent.delay(2)
			.transition({ rotate: '8deg' })
			.delay(5)
			.transition({ rotate: '-5deg' })
			.transition({ rotate: '0deg' });

};

var punchAgainst = function(){
	var againstFist = $('#against_fist_front');
	var opponent = $("#fighter1");
	againstFist
		.css({
			transform: "scaleX(-1)",
			backgroundPosition: "0 -126px",
			width: "448px"
			})
		.animate({marginLeft: "-400px", marginTop: "-50px"},50, function(){
			$(this).css({
			backgroundPosition: "0 -249px",
			})
			.delay(60)
			.animate({marginLeft: "0px", marginTop: "0px"},600)
			})
	opponent.delay(2)
			.transition({ rotate: '-8deg' })
			.delay(5)
			.transition({ rotate: '5deg' })
			.transition({ rotate: '0deg' });

};

$(function(){
	var buttonFor = $('#button_for');
	var buttonAgainst = $('#button_against');

	buttonFor.on("click", function(e){
		console.log("works");
		punchFor();
	});
	buttonAgainst.on("click", function(e){
		console.log("works");
		punchAgainst();
	});
});