$(document).ready(function run() {

	const gemCount = 4;
	const gemMax = 12;

	var gemValues = [];
	var numCurrent = 0;
	var numTarget = 0;

	var wins = 0;
	var losses = 0;
	var clicks = 0;

	function rand(min, max) {
		return Math.floor( Math.random() * (max-min+1) ) + min;
		// chosen by fair dice roll, guaranteed to be random
	}

	// create a string with a number and plural word
	function plural(num, str, plural) {
		if (num === 1) {
			return num + " " + str;
		} else {
			return num + " " + plural;
		}
	}


	function newGame() {

		// reset variables
		gemValues = [];
		numCurrent = 0;
		clicks = 0;

		// assign each gem a value and update image
		for (var i=0; i<gemCount; i++) {
			var value = rand(1, gemMax);
			gemValues.push(value);
			$("#gem-"+i).attr("src", "assets/img/gem-" + value + ".png");
		}

		// pick a random target
		numTarget = rand(19, 120);
		$("#out-numTarget").text(numTarget);

		$("#out-numCurrent").text(numCurrent);

	}


	function gemClicked(index) {

		// increment clicks
		clicks++;
		
		// add value of gem to current number
		numCurrent += gemValues[index];
		$("#out-numCurrent").text(numCurrent);
		
		if (numCurrent === numTarget) {

			// player has won
			wins++;

			// display result
			$("#out-wins").text(plural(wins, "win", "wins"));
			$("#out-status").text("You matched " + numTarget + " in " + plural(clicks, "click! Impressive!", "clicks!"));

			// start new game
			newGame();

		} else if (numCurrent >= numTarget) {
			
			// player has lost
			losses++;

			// display result
			$("#out-losses").text(plural(losses, "loss", "losses"));
			$("#out-status").text("You missed the target by " + (numCurrent-numTarget) + ".");

			// start new game
			newGame();

		} else {

			// keep clicking
			$("#out-status").text(plural(clicks, "click", "clicks"));
		}

	}


	$(".gem").click(function cluck() {

		// if game hasn't ended
		if (numCurrent <= numTarget) {

			// register click
			gemClicked($(this).attr("data-gem"));
		}

	});


	newGame();
	$("#out-status").text("Welcome to Crystal Collector! Click a gem to add to your score.");
	
});